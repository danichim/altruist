import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert,
} from "react-native";
import { useEffect } from "react";
import { useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { AuthContext } from "../../App";
import { useState } from "react";
import { Overlay } from "react-native-elements";
import * as Location from "expo-location";
import axios from "axios";
import { API_URL } from "../constants/constant";
import { createRef } from "react";
import OrderDetailModal from "../components/OrderDetailModal";
import AcceptActions from "../components/AcceptActions";

const MapScreen = ({ navigation, route }) => {
  const [overlayOrder, setOverlayOrder] = useState(false);
  const [location, setLocation] = useState(null);
  const [orders, setOrders] = useState([]);
  const { authContext } = useContext(AuthContext);
  const map = createRef();

  useEffect(() => {
    authContext.backToScreen("ListOrdersScreen");
    getUserLocation();

    getOrders();

    return () => {
      authContext.backToScreen(null);
    };
  }, []);

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

  const getUserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setLocation({ latitude, longitude });
  };

  const getOrders = async () => {
    const { token } = JSON.parse(await AsyncStorage.getItem("user"));

    axios
      .get(`${API_URL}/order/gps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const o = res.data.map((order) => {
          return {
            ...order,
            name: order.title,
            avatar_url:
              "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            subtitle: order.description,
          };
        });
        setOrders(o);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const showModal = (order) => {
    setOverlayOrder(order);
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
        Alert.alert("Alert", "You are the hero. Go for it.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("ListOrdersScreen"),
          },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  if (!location) return null;

  return (
    <View style={{ flex: 1 }}>
      <Overlay
        isVisible={!!overlayOrder}
        onBackdropPress={() => setOverlayOrder(false)}
        height={600}
        overlayStyle={{ padding: 0, borderRadius: 5 }}
      >
        <OrderDetailModal
          order={overlayOrder}
        >
          <AcceptActions
            order={overlayOrder}
            onAccept={onAccept}
            onClose={() => setOverlayOrder(false)}
          />
        </OrderDetailModal>
      </Overlay>
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
              key={order.id}
              coordinate={{
                latitude: parseFloat(order.latitude),
                longitude: parseFloat(order.longitude),
              }}
              onPress={() => showModal(order)}
              title={order.name}
              description={order.description}
            />
          ))}
      </MapView>
    </View>
  );
};

const style = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
