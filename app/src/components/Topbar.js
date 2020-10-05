import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage, StyleSheet } from "react-native";
import { Header, Icon } from "react-native-elements";
import { AuthContext } from "../../App";
import { DrawerActions } from "@react-navigation/native";

const Topbar = (props) => {
  const {
    authContext,
    state: { back },
  } = useContext(AuthContext);
  const { navigation } = props;

  return (
    <Header
      statusBarProps={{ barStyle: "light-content" }}
      barStyle="light-content" // or directly
      centerComponent={{ text: "Altruist Style", style: { color: "#fff" } }}
      rightComponent={() => {
        return (
          props.isAuth && (
            <Icon
              type="material-community"
              name="exit-run"
              color="#fff"
              onPress={authContext.signOut}
            />
          )
        );
      }}
      containerStyle={{
        backgroundColor: "#3D6DCC",
        justifyContent: "space-around",
      }}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    textAlign: "center",
  },
});

export default Topbar;
