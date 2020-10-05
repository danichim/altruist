import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import MapView, { Marker } from "react-native-maps";

import { AuthContext } from "../../App";
import { Overlay } from "react-native-elements";
import * as Location from "expo-location";
import OrderDetailModal from "../components/OrderDetailModal";
import CreatedByActions from "../components/CreatedByActions";
import AcceptedByActions from "../components/AcceptedByActions";
import AcceptActions from "../components/AcceptActions";
import axios from "axios";
import { API_URL } from "../constants/constant";

const OrderDetail = ({ navigation, route }) => {
  const [overlayOrder, setOverlayOrder] = useState(true);
  const [location, setLocation] = useState(null);
  const [userId, setUserId] = useState(null);

  const { authContext } = useContext(AuthContext);
  const orderDetails = route.params.order;

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
    };

    const getUserInfo = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setUserId(user.userId);
    };

    authContext.backToScreen("ListOrdersScreen");
    getUserLocation();
    getUserInfo();

    return () => {
      authContext.backToScreen(null);
    };
  }, []);

  const isCreatedByUser = () => {
    if (!userId) return false;
    return orderDetails.created_by?.id === userId;
  };

  const isAcceptedByUser = () => {
    if (!userId) return false;

    return orderDetails.accepted_by?.id === userId;
  };

  const showModal = () => {
    setOverlayOrder(!overlayOrder);
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
        authContext.getAllOrders();
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
        isVisible={overlayOrder}
        height={600}
        overlayStyle={{ padding: 0, borderRadius: 5 }}
        onBackdropPress={() => setOverlayOrder(false)}
      >
        <OrderDetailModal order={orderDetails} style={{
          borderRadius: 15}}>
          {isCreatedByUser() && (
            <CreatedByActions
              navigation={navigation}
              order={orderDetails}
              onAccept={() => {}}
              onClose={() => setOverlayOrder(false)}
            />
          )}
          {isAcceptedByUser() && (
            <AcceptedByActions
              navigation={navigation}
              order={orderDetails}
              onAccept={() => {
              }}
              onClose={() => setOverlayOrder(false)}
            />
          )}
          {!isAcceptedByUser() && !isCreatedByUser() && (
            <AcceptActions
              order={orderDetails}
              onAccept={onAccept}
              onClose={() => setOverlayOrder(false)}
            />
          )}
        </OrderDetailModal>
      </Overlay>
      <MapView
        style={style.mapStyle}
        initialRegion={{
          latitude: parseFloat(location?.latitude),
          longitude: parseFloat(location?.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(location?.latitude),
            longitude: parseFloat(location?.longitude),
          }}
          onPress={showModal}
          title={orderDetails.title}
          description={orderDetails.description}
        />
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

export default OrderDetail;
