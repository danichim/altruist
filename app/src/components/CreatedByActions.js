import * as React from "react";
import { View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { API_URL } from "../constants/constant";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { useState } from "react";
import { ShowDialog } from "./ShowDialog";
import { StatusInProgress, StatusOpen } from "./StatusPage";

const CreatedByActions = ({ order, navigation, onClose }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { authContext: { getAllOrders } } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
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


  const errBuilder = (errorMessage) => {

    const values = Object.values(errorMessage.constraints)
    const value = {
      [errorMessage.property]: values
    }
    return value
  }

  const onCancelOrder = async () => {
    try {
      await axios.put(`${API_URL}/order/${order.id}`, { "status": "canceled" })
      alert("Your request has been canceled successfully.")
      getAllOrders();
    }
    catch (err) {
      console.log(err)
    }
  }

  const onThankyou = async () => {
    try {
      await axios.put(`${API_URL}/order/${order.id}/thanks`)
      alert("Great. Thank you");
    }
    catch (error) {
      const errorMessages = error.response.data.errorMessage
      if (errorMessages.length) {
        const errors = errBuilder(errorMessages[0])
        const key = Object.keys(errors)
        Alert.alert(key.toString(), errors[key][0])
      }
    }
  }


  const onReport = async () => {
    try {
      await axios.post(`${API_URL}/order/${order.id}/report`, { subject, message })
      alert("Great. Thank you");
    } catch (error) {
      const errorMessages = error.response.data.errorMessage
      if (errorMessages.length) {
        const errors = errBuilder(errorMessages[0])
        const key = Object.keys(errors)
        Alert.alert(key.toString(), errors[key][0])
      }
    }
  }


  if (showReport) {
    return (
      <ShowDialog styles={styles} setThankyou={onThankyou} setShowModal={setShowModal} showModal={showModal}
        setOnReport={onReport} setSubject={setSubject} setMessage={setMessage} setShowReport={setShowReport} />
    )
  }

  function componentSelector() {
    if (order.status === 'in progress') {
      return <StatusInProgress styles={styles} order={order} setShowReport={setShowReport}
      />
    }

    if (order.status === 'open') {
      return <StatusOpen styles={styles} setCancelOrder={onCancelOrder} />
    }

  }

  return (
    <View style={{ width: "100%", justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
      {componentSelector()}
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
