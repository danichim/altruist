import * as React from "react";
import {View, StyleSheet, Text, TouchableOpacity, AsyncStorage, Alert} from "react-native";
import {Button, Input} from "react-native-elements";
import moment from "moment";
import {Formik} from "formik";
import TimePicker from "react-native-24h-timepicker";
import {createRef} from "react";
import {useState} from "react";
import * as Location from "expo-location";
import axios from "axios";
import {API_URL} from "../../constants/constant";

const RequestForm = (props) => {
  const timePicker = createRef();
  const [time, setTime] = useState();

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
    }

    let location = await Location.getCurrentPositionAsync({});

    return location.coords;
  }

  const onSubmit = async (values, {resetForm}) => {
    const date = new Date();
    date.setHours(time.hour);
    date.setMinutes(time.minute);

    values.expires_at = moment(date).format('YYYY-MM-DD HH:mm');
    const {latitude, longitude} = await getLocation();
    values.latitude = latitude;
    values.longitude = longitude;

    save(values, resetForm);
  }

  const save = async (data, resetForm) => {
    const { token } = JSON.parse(await AsyncStorage.getItem("user"));
    axios
      .post(`${API_URL}/order`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resetForm({});
        setTime(null);
        Alert.alert("Alert", "Your request has been added successfully.", [
          { text: "OK", onPress: () => props.onSuccess() },
        ]);

      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onCancel = () => {
    timePicker.close();
  }

  const onConfirm = (hour, minute) => {
    setTime({
      hour: hour,
      minute: minute
    });
    timePicker.current.close();
  }

  return (
    <Formik
      initialValues={{
        description: "",
        title: "",
        address: "",
        expires_at: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        mylocation: "",
      }}
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
        <View>
          <TimePicker
            ref={timePicker}
            value={time}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
          <TouchableOpacity
            onPress={() => {
              timePicker.current.open()
            }}
          >
            <View style={[style.input, style.when]}>
              <Text style={{fontSize: 18}}>{time ? (time.hour + ":" + time.minute) : 'When'}</Text>
            </View>
          </TouchableOpacity>
          <View style={style.input}>
            <Input
              inputContainerStyle={{borderBottomWidth: 0}}
              style={style.input}
              name="title"
              placeholder="Title"
              onBlur={() => setFieldTouched("title")}
              onChangeText={handleChange("title")}
            />
          </View>
          <View style={[style.input, style.inputMulti]}>
            <Input
              inputContainerStyle={{borderBottomWidth: 0}}
              containerStyle={[style.input, style.inputMultiInput]}
              multiline
              name="Description"
              placeholder="Description"
              onBlur={() => setFieldTouched("description")}
              onChangeText={handleChange("description")}
            />
          </View>
          <View style={{justifyContent: "flex-end"}}>
            <Button
              buttonStyle={style.button}
              title={"Request"}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  )
};

const style = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: "#37AE47",
  },
  inputMultiInput: {
    height: 100,
    margin: 0,
    padding: 0
  },
  when: {
    fontSize: 20,
    marginBottom: 20,
    justifyContent: "center",
    paddingLeft: 10,
    width: "100%",
  },
  inputMulti: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginTop: 20,
    padding: 0,
    height: 100,
  },
  input: {
    borderRadius: 4,
    borderColor: "#E2E5EE",
    borderWidth: 1,
    height: 50,
    paddingVertical: 5,
    backgroundColor: "white",
    width: "100%",
  },
});

export default RequestForm;
