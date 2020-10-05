import React from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import Title from "../components/Title";
import axios from "axios";
import { API_URL } from "../constants/constant";
import * as yup from "yup";
import { Formik } from "formik";
import { AuthContext } from "../../App";

let schema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().required().email(),
});

const LoginScreen = ({ navigation }) => {
  const { authContext } = React.useContext(AuthContext);
  const onSubmit = (values) => {
    authContext.signUp({ email: values.email, password: values.password });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/logo.png")}
      />
      <Formik
        initialValues={{
          email: "Server@server.com",
          password: "admin123",
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
                defaultValue="Server@server.com"
                onChangeText={handleChange("email")}
                style={styles.input}
                onBlur={() => setFieldTouched("email")}
                errorMessage={errors.email && touched.email ? errors.email : ""}
                placeholder="Email"
              />
            </View>
            <View style={styles.input}>
              <Input
                onChangeText={handleChange("password")}
                style={styles.input}
                defaultValue="admin123"
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
              title="Login"
            />
            <Button
              buttonStyle={{ marginTop: 10, borderColor: "#3D6DCC" }}
              onPress={() => navigation.navigate("Register")}
              type={"outline"}
              title="Go to Register"
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
  input: {
    marginVertical: 10,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default LoginScreen;
