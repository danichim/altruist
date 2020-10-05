import * as React from "react";
import {Text, TouchableOpacity, View, StyleSheet, Linking, Alert} from "react-native";
import axios from "axios";
import {API_URL} from "../constants/constant";
import {useContext} from "react";
import {AuthContext} from "../../App";

const AcceptedByActions = (props) => {
  const {authContext: {getAllOrders}} = useContext(AuthContext);
  const alert = (message) => {
    Alert.alert("Success", message, [
      {
        text: "OK",
        onPress: () => {
          props.onClose();
          getAllOrders()
        }
      },
    ]);
  }

  const onDone = () => {
    axios.put(`${API_URL}/order/${props.order.id}`, {"status": "done"}).then((data) => {
      getAllOrders();
      alert("Great. Thank you");
    }).catch((err) => console.log(err))
  }

  if (props.order.status === 'done') {
    return (
      <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          onPress={() => props.onClose()}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
      <View style={{width: "33.3%"}}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          onPress={() => props.onClose()}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: "33.3%"}}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          onPress={() => Linking.openURL(`tel:${props.order.created_by?.phone}`)}
        >
          <Text>Call</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: "33.3%"}}>
        <TouchableOpacity
          style={[styles.buttonStyle]}
          onPress={onDone}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  acceptStyle: {
    backgroundColor: "green",
  },
  cancelStyle: {
    backgroundColor: "gray",
  },
  buttonStyle: {
    backgroundColor: "#FCFDFD",
    width: "100%",
    justifyContent: "center",
    height: 50,
    fontSize: 16,
    color: "black",
    alignItems: "center",
  },
})

export default AcceptedByActions;
