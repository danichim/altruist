import * as React from "react";
import {View, StyleSheet, Dimensions, ScrollView} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useContext} from "react";
import {AuthContext} from "../../../App";
import {createRef} from "react";
import {useState} from "react";
import {useEffect} from "react";
import * as Location from "expo-location";
import RequestForm from "./RequestForm";

const Request = () => {
  const {state: {orders}, authContext} = useContext(AuthContext);
  const [location, setLocation] = useState(null);
  const { authContext: {getAllOrders} } = useContext(AuthContext);
  const map = createRef();

  useEffect(() => {
    authContext.backToScreen("ListOrdersScreen");

    getUserLocation();

    return () => {
      authContext.backToScreen(null);
    };
  }, []);

  const getUserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setLocation({ latitude, longitude });
  };

  const getMarkerColor = (order) => {
    const {status} = order;

    if (status === 'open') return "green";
    if (status === 'canceled' || status === 'done') return "red";
    if (status === 'in progress') return "yellow";

  }

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

  const onSuccess = () => {
    getAllOrders();
  }

  if (!location) return null;

  return (
    <View style={style.container}>
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
                key={order.id}
                pinColor={getMarkerColor(order)}
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
        </ScrollView>
        <View style={style.form}>
          <RequestForm onSuccess={onSuccess}/>
        </View>
      </View>
    </View>
  )
};

const style = StyleSheet.create({
  form: {position: "absolute", bottom: 20, width: "100%", paddingHorizontal: 20},
  container: {
    flex: 1
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
})

export default Request;
