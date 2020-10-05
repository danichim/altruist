import * as React from "react";
import {Text, TouchableOpacity, View, StyleSheet, Alert} from "react-native";
import axios from "axios";
import {API_URL} from "../constants/constant";
import {Linking} from 'react-native'
import {useContext} from "react";
import {AuthContext} from "../../App";
import {useState} from "react";
import {Input} from "react-native-elements";

const CreatedByActions = ({order, navigation, onClose}) => {
  const {authContext: {getAllOrders}} = useContext(AuthContext);
  const [showReport, setShowReport] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const alert = (message) => {
    Alert.alert("Success", message, [
      {
        text: "OK",
        onPress: () => {
          onClose();
          getAllOrders()
        }
      },
    ]);
  }

  const onCancelOrder = () => {
    axios.put(`${API_URL}/order/${order.id}`, {"status": "canceled"}).then((data) => {
      alert("Your request has been canceled successfully.")
      getAllOrders();
    }).catch((err) => console.log(err))
  }

  const onThankyou = async () => {
    await axios.put(`${API_URL}/order/${order.id}`, {"status": "done"});
    axios.post(`${API_URL}/order/${order.id}/thanks`).then((data) => {
      alert("Great. Thank you");
    });
  }

  const onReport = async () => {
    await axios.put(`${API_URL}/order/${order.id}`, {"status": "done"});
    axios.post(`${API_URL}/order/${order.id}/report`, {title, message}).then((data) => {
      alert("Great. Thank you");
    });
  }

  if (order.status === 'open') {
    return (
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={[styles.buttonStyle, styles.cancelStyle]}
          onPress={onCancelOrder}
        >
          <Text>Cancel order</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (showReport) {
    return (
      <View style={{ width: "100%"}}>
        <View style={styles.input}>
          <Input
            containerStyle={{borderWidth: 0}}
            style={{borderWidth: 0, height: 100}}
            multiline
            name="title"
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.input}>
          <Input
            containerStyle={{borderWidth: 0}}
            inputContainerStyle={{borderWidth: 0}}
            inputStyle={{borderWidth: 0, height: 100}}
            multiline
            name="message"
            placeholder="Message"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
        <View style={{ width: "49%" }}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.acceptStyle]}
            onPress={ onReport }
          >
            <Text >Report</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: "49%"}}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.acceptStyle]}
            onPress={onThankyou}
          >
            <Text>Thank you</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }

  if (order.status === 'in progress') {
    return (
      <View style={{ width: "100%", flexDirection: "column" }}>
        <View style={{width: "100%"}}>
          <Text style={{fontSize: 16, marginVertical: 10, textAlign: "center"}}>
            The order has been taken  by {order.accepted_by.name} {order.accepted_by.surname}
          </Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
          <View style={{ width: "33.3%" }}>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.acceptStyle]}
              onPress={ () => Linking.openURL(`tel:${order.accepted_by.phone}`) }
            >
              <Text >Call</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: "33.3%"}}>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.acceptStyle]}
              onPress={() => setShowReport(true)}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View  style={{ width: "100%", justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.cancelStyle]}
        onPress={onClose}
      >
        <Text>Close</Text>
      </TouchableOpacity>
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
  input: {
    marginVertical: 5,
    paddingVertical: 5,
    backgroundColor: "white",
    width: "100%",
  },
  buttonStyle: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default CreatedByActions;
