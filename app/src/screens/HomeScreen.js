import React, {useContext} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import {AuthContext} from "../../App";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from "@react-navigation/native";

import ListOrdersScreen from './ListOrdersScreen';
import RequestOrder from './RequestOrder';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="View Requests" component={ListOrdersScreen}/>
          <Tab.Screen name="Create Request" component={RequestOrder}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
