import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-elements";
import React from "react";

const BottomBar = ({ onPress }) => {
  return (
    <View style={styles.textContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          type="material-community"
          name="transit-connection-variant"
        />

        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            color: "black",
          }}
        >
          Activity
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    height: 45,
    backgroundColor: "#fff",
  },
});

export default BottomBar;
