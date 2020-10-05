import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage,
  Alert,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useContext } from "react";
import { AuthContext } from "../../../App";
import { createRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as Location from "expo-location";
import RequestForm from "./RequestForm";
import OrderDetailModal from "../../components/OrderDetailModal";
import AcceptActions from "../../components/AcceptActions";
import { Icon, Overlay } from "react-native-elements";
import axios from "axios";
import { API_URL } from "../../constants/constant";
import CreatedByActions from "../../components/CreatedByActions";
import AcceptedByActions from "../../components/AcceptedByActions";
import BottomBar from "./BottomBar";

const Help = ({ navigation }) => {
  const {
    state: { orders },
    authContext,
  } = useContext(AuthContext);
  const [overlayOrder, setOverlayOrder] = useState(false);
  const [userId, setUserId] = useState();
  const [location, setLocation] = useState(null);

  const map = createRef();

  useEffect(() => {
    getUserLocation();

    return () => {
      authContext.backToScreen(null);
    };
  }, []);

  const showModal = (order) => {
    setOverlayOrder(order);
  };

  const getUserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    setUserId(user.userId);
    if (status !== "granted") {
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setLocation({ latitude, longitude });
  };

  const onMapReady = () => {
    if (orders.length === 0) {
      return;
    }
    const locations = orders.map((order) => ({
      latitude: order.latitude,
      longitude: order.longitude,
    }));

    map.current.fitToCoordinates(locations, {
      edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
      animated: false,
    });
  };

  const getMarkerColor = (order) => {
    const { status } = order;

    if (status === "open") return "green";
    if (status === "canceled" || status === "done") return "red";
    if (status === "in progress") return "yellow";
  };

  const onAccept = async (order) => {
    const { token } = JSON.parse(await AsyncStorage.getItem("user"));
    axios
      .post(
        `${API_URL}/order/${order.id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOverlayOrder(false);
        authContext.getAllOrders();
        Alert.alert("Alert", "You are the hero. Go for it.", [
          {
            text: "OK",
          },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const isCreatedByUser = () => {
    if (!userId) return false;
    return overlayOrder.created_by?.id === userId;
  };

  const isAcceptedByUser = () => {
    if (!userId) return false;

    return overlayOrder.accepted_by?.id === userId;
  };

  if (!location) return null;

  return (
    <View style={style.container}>
      <Overlay
        isVisible={!!overlayOrder}
        onBackdropPress={() => setOverlayOrder(false)}
        height={600}
        overlayStyle={{ padding: 0, borderRadius: 5 }}
      >
        <OrderDetailModal order={overlayOrder}>
          {isCreatedByUser() && (
            <CreatedByActions
              navigation={navigation}
              order={overlayOrder}
              onAccept={() => {}}
              onClose={() => setOverlayOrder(false)}
            />
          )}
          {isAcceptedByUser() && (
            <AcceptedByActions
              navigation={navigation}
              order={overlayOrder}
              onAccept={() => {}}
              onClose={() => setOverlayOrder(false)}
            />
          )}
          {!isAcceptedByUser() && !isCreatedByUser() && (
            <AcceptActions
              order={overlayOrder}
              onAccept={onAccept}
              onClose={() => setOverlayOrder(false)}
            />
          )}
        </OrderDetailModal>
      </Overlay>
      <View>
        <ScrollView>
          <MapView
            onLayout={onMapReady}
            ref={map}
            style={style.mapStyle}
            showsUserLocation={true}
            initialRegion={{
              latitude: parseFloat(location?.latitude),
              longitude: parseFloat(location?.longitude),
              zoomControlEnabled: true,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {orders.length > 0 &&
              orders.map((order) => (
                <Marker
                  pinColor={getMarkerColor(order)}
                  key={order.id}
                  coordinate={{
                    latitude: parseFloat(order.latitude),
                    longitude: parseFloat(order.longitude),
                  }}
                  onPress={() => showModal(order)}
                  title={order.title}
                  description={order.description}
                ></Marker>
              ))}
          </MapView>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Help;
