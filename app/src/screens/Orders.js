import * as React from "react";
import ListOrdersScreen from "./ListOrdersScreen";
import OrderDetail from "./OrderDetails";
import {createStackNavigator} from "@react-navigation/stack";
import {useEffect} from "react";
import MapScreen from "./MapScreen";
const Stack = createStackNavigator();

const Orders = ({navigation}) => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ListOrdersScreen" component={ListOrdersScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  )
};

export default Orders;
