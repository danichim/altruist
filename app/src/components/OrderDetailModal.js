import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView, Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const OrderDetailModal = (props) => {
  const { order } = props;



  const getBackgroundColor = () => {
    const { status } = order;
    if (status === 'open') return {from: "#04B437", to: "#5BDA7F"};
    if (status === 'canceled' || status === 'done') return {from: "#FF3C43", to: "#F67277"};
    if (status === 'in progress') return {from: "#8B52FD", to: "#B087FF"};

    return 'transparent';
  }

  const backgroundColor = getBackgroundColor();

  return (
    <LinearGradient
      style={styles.container}
      colors={[backgroundColor.from, backgroundColor.to]}
    >
      <Text
        style={{
          backgroundColor: "transparent",
          fontSize: 22,
          color: "#fff",
          textAlign: "center"
        }}
      >
        {order.title}
      </Text>
      <Text
        style={{
          backgroundColor: "transparent",
          fontSize: 18,
          marginTop: 10,
          color: "#fff",
          fontStyle: "italic",
          textAlign: "center"
        }}
      >
        {order.status}
      </Text>
      <ScrollView>
        <Text style={styles.description}>{order.description}</Text>
        {/*TODO: ADDRESS*/}
      </ScrollView>
      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  actions: {
    paddingBottom: 10,
    paddingHorizontal: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    padding: 40,
    flex: 1,
    paddingBottom: 80,
  },
  label: {
    paddingHorizontal: 15,
    color: "white",
    fontSize: 18,
    width: "100%",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  description: {
    marginTop: 50,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 15,
    fontSize: 18,
  },

});

export default OrderDetailModal;
