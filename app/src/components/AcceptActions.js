import * as React from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";

const AcceptActions = (props) => {
  return (
    <View style={{flexDirection:"row", justifyContent: "space-between"}}>
      <View style={{ width: "48%" }}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          onPress={() => props.onAccept(props.order)}
        >
          <Text>Accept</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "48%" }}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          onPress={props.onClose}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  acceptStyle: {
    backgroundColor: "#FCFDFD",
  },
  cancelStyle: {
    backgroundColor: "#FCFDFD",
  },
  buttonStyle: {
    fontSize: 16,
    color: "black",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCFDFD",
  },
})

export default AcceptActions;
