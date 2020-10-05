import React, { useState } from "react";
import { Text, Image, View, StyleSheet, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import Title from "../components/Title";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { API_URL } from "../constants/constant";
import * as yup from "yup";
import { Formik } from "formik";
import { AuthContext } from "../../App";

let schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required().email(),
});

const RegisterScreen = ({ navigation }) => {
  const { authContext } = React.useContext(AuthContext);
  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/auth/register`, values)
      .then((data) => {
        Alert.alert("Alert", "Success.");
        authContext.signUp({ email: values.email, password: values.password });
      })
      .catch((err) => {
        console.log("err", err.response);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/logo.png")}
      />
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldTouched,
          isSubmitting,
          isValid,
        }) => (
          <View style={styles.inner}>
            <Title />
            <View style={styles.input}>
              <Input
                onChangeText={handleChange("name")}
                placeholder="Name"
                onBlur={() => setFieldTouched("name")}
                errorMessage={errors.name && touched.name ? errors.name : ""}
              />
            </View>
            <View style={styles.input}>
              <Input
                onChangeText={handleChange("surname")}
                style={styles.input}
                onBlur={() => setFieldTouched("surname")}
                errorMessage={
                  errors.surname && touched.surname ? errors.surname : ""
                }
                placeholder="Surname"
              />
            </View>
            <View style={styles.input}>
              <Input
                onChangeText={handleChange("email")}
                style={styles.input}
                onBlur={() => setFieldTouched("email")}
                errorMessage={errors.email && touched.email ? errors.email : ""}
                placeholder="Email"
              />
            </View>
            <View style={styles.input}>
              <Input
                onChangeText={handleChange("phone")}
                style={styles.input}
                placeholder="Phone"
                onBlur={() => setFieldTouched("phone")}
                errorMessage={errors.phone && touched.phone ? errors.phone : ""}
              />
            </View>
            <View style={styles.input}>
              <Input
                onChangeText={handleChange("password")}
                style={styles.input}
                placeholder="Password"
                onBlur={() => setFieldTouched("password")}
                errorMessage={
                  errors.password && touched.password ? errors.password : ""
                }
                secureTextEntry={true}
              />
            </View>
            <Button
              buttonStyle={{ backgroundColor: "#3D6DCC" }}
              onPress={handleSubmit}
              disabled={isSubmitting && !isValid}
              title="Register"
            />
            <Button
              buttonStyle={{ marginTop: 10, borderColor: "#3D6DCC" }}
              onPress={() => navigation.navigate("Login")}
              type={"outline"}
              title="Go to login"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  inner: {
    width: "80%",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default RegisterScreen;
