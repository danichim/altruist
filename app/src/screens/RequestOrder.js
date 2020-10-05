import React, {useContext, useEffect, useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as yup from "yup";
import * as Location from "expo-location";
import moment from "moment";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { API_URL, POSITION_STACK_API_KEY } from "../constants/constant";
import {AuthContext} from "../../App";

let schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  expires_at: yup.string().required(),
});

const RequestOrder = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState({});
  const [show, setShow] = useState(false);
  const { authContext: {getAllOrders} } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
    })();
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const setExpiration = () => {
    setShow(!show);
  };

  const onSubmit = async (values) => {
    let latitude = null;
    let longitude = null;
    try {
      const result = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=${POSITION_STACK_API_KEY}&query=${values.address}`
      );
      if (result && !values.mylocation) {
        latitude = result.data.data[0].latitude;
        longitude = result.data.data[0].longitude;
      }
    } catch (err) {
      console.log(err);
    }

    latitude = latitude || location.latitude;
    longitude = longitude || location.longitude;

    const data = {
      ...values,
      latitude,
      longitude,
    };

    await save(data);
  };

  const save = async (data) => {
    const { token } = JSON.parse(await AsyncStorage.getItem("user"));
    axios
      .post(`${API_URL}/order`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Alert.alert("Alert", "Your request has been added successfully.", [
          { text: "OK", onPress: () => navigation.navigate("Orders") },
        ]);
        getAllOrders();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.inner}>
        <Formik
          initialValues={{
            description: "",
            title: "",
            address: "",
            expires_at: moment(new Date()).format("YYYY-MM-DD HH:mm"),
            mylocation: "",
          }}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            setFieldTouched,
            isSubmitting,
            isValid,
          }) => (
            <>
              <Text style={styles.title}>I need your help</Text>

              <View style={styles.input}>
                <Input
                  multiline
                  name="title"
                  placeholder="Title"
                  onBlur={() => setFieldTouched("title")}
                  onChangeText={handleChange("title")}
                  errorMessage={
                    errors.title && touched.title ? errors.title : ""
                  }
                />
              </View>

              <View style={styles.input}>
                <Input
                  multiline
                  name="description"
                  placeholder="Description"
                  onBlur={() => setFieldTouched("description")}
                  onChangeText={handleChange("description")}
                  errorMessage={
                    errors.description && touched.description
                      ? errors.description
                      : ""
                  }
                />
              </View>

              <View style={styles.input}>
                <CheckBox
                  title="Use my location"
                  checked={values.mylocation}
                  onPress={() =>
                    setFieldValue("mylocation", !values.mylocation)
                  }
                />
              </View>
              {!values.mylocation && (
                <View style={styles.input}>
                  <Input
                    multiline
                    name="address"
                    placeholder="Address"
                    onBlur={() => setFieldTouched("address")}
                    onChangeText={handleChange("address")}
                  />
                </View>
              )}

              <View style={styles.input}>
                <Button onPress={setExpiration} title="Set expiration time" />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={(event, selectedDate) => {
                      onChange(event, selectedDate);
                      setFieldTouched("expires_at");
                      setFieldValue(
                        "expires_at",
                        moment.utc(selectedDate).format("YYYY-MM-DD HH:mm")
                      );
                    }}
                  />
                )}
              </View>
              <View style={styles.input}>
                <Input
                  name="expires_at"
                  placeholder="Expires"
                  value={values.expires_at}
                  disabled
                  errorMessage={
                    errors.expires_at && touched.expires_at
                      ? errors.expires_at
                      : ""
                  }
                />
              </View>
              <Button
                style={{ marginTop: 10 }}
                onPress={handleSubmit}
                title="Create request"
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  inner: {
    marginTop: 20,
    width: "90%",
  },
  input: {
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default RequestOrder;
