import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";
import React from "react";

const MyCustomLeftComponent = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

        <Icon color="#1665D8" type="font-awesome" name="support" />

        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            color: "black",
          }}
        >
          Help someone
        </Text>
    </TouchableOpacity>
  );
};

const MyCustomRightComponent = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderLeftWidth: 1,
        borderLeftColor: "#EAEDF3",
      }}
    >
        <Icon color="#34AA44" type="material-community" name="bullseye-arrow" />

        <Text
          style={{
            paddingLeft: 10,
            fontSize: 16,
            color: "black",
          }}
        >
          Request help
        </Text>
    </TouchableOpacity>
  );
};

const TopButtons = ({ showHelpView, showRequestView }) => {
  return (
    <View style={styles.textContainer}>
      <MyCustomLeftComponent  onPress={() => showHelpView()}/>
      <MyCustomRightComponent onPress={() => showRequestView()}/>
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

export default TopButtons;
