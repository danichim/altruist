import React from "react";
import { Text, View, StyleSheet } from "react-native";

const OrderScreen = (props) => {
  return (
    <View>
      <Text style={styles.title}>Order Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});

export default OrderScreen;
