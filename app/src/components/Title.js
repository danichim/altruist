import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const Title = () => {
  return (
    <>
      <Text style={styles.title}>Altruist</Text>
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#3D6DCC",
  },
});

export default Title;
