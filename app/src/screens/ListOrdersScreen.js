import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { ListItem, Text, Icon } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthContext } from "../../App";
import Main from "./Main/Main";

const Tab = createBottomTabNavigator();

const keyExtractor = (item, index) => index.toString();

const ListOrdersScreen = ({ navigation }) => {
  const {
    state: { orders, userId },
    authContext: { getAllOrders },
  } = useContext(AuthContext);

  useEffect(() => {
    getAllOrders();
  }, []);

  const colors = {
    blue: "#1665D8",
    richblack: "#080708",
    rosemadder: "#DF2935",
    sun: "#FDCA40",
    platinum: "#E6E8E6",
    light: "#BCC4DB",
    pale: "#BBCDE5",
    azure: "#639FAB",
    lightsteelblue: "#BBCDE5",
    white: "#FFFFFF",
    smoke: "#f6f4f3",
  };

  const onItemClickHandler = (order) => {
    if (order.status === "canceled" || order.status === "done") {
      return;
    }
    navigation.navigate("OrderDetail", { order: order });
  };

  const listProgressOrdersOptions = {
    id: 1,
    colors: [colors.smoke, colors.smoke],
    icon: {
      type: "font-awesome",
      name: "exclamation",
      color: colors.blue,
      size: 26,
    },
  };

  const listRequestOrdersOptions = {
    id: 2,
    icon: {
      type: "font-awesome",
      name: "support",
      color: colors.blue,
      size: 26,
    },
    colors: [colors.smoke, colors.smoke],
  };

  const listPersonalOrdersOptions = {
    id: 0,
    colors: [colors.smoke, colors.smoke],
    icon: {
      type: "font-awesome",
      name: "user",
      color: colors.blue,
      size: 26,
    },
  };

  const NoDataEntry = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No data!</Text>
      </View>
    );
  };

  const ListRequests = ({
    items,
    options,
    clickHandler,
    keyExtractor,
    type,
  }) => {
    const {
      state: { orders },
    } = useContext(AuthContext);
    let ord = [];
    if (type === "in progress") {
      ord = orders.filter((o) => o.status === "in progress");
    }
    if (type === "open") {
      ord = orders.filter((o) => o.status === "in progress");
    }

    if (type === "users") {
      ord = orders.filter((order) => order.created_by.id === userId);
    }

    return (
      <ScrollView>
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                Component={TouchableScale}
                friction={90} //
                tension={100} //
                activeScale={0.95} //
                linearGradientProps={{
                  colors: options.colors,
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                leftAvatar={{
                  rounded: true,
                  source: {
                    uri: `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=${item.title}`,
                  },
                }}
                title={item.title}
                titleStyle={{ color: colors.richblack, fontWeight: "bold" }}
                subtitleStyle={{ color: colors.blue }}
                subtitle={`${item.description} - Status: ${item.status}`}
                chevron={options.icon}
                onPress={() => clickHandler(item)}
              />
            );
          }}
          keyExtractor={keyExtractor}
        />
      </ScrollView>
    );
  };

  const InProgressComponent = () => {
    return (
      <ListRequests
        type="in progress"
        items={orders.filter((order) => order.status === "in progress")}
        options={listProgressOrdersOptions}
        clickHandler={() => {}}
        keyExtractor={keyExtractor}
      />
    );
  };

  const OpenComponent = () => {
    return (
      <ListRequests
        type="in progress"
        items={orders.filter((order) => order.status === "open")}
        options={listRequestOrdersOptions}
        clickHandler={() => {}}
        keyExtractor={keyExtractor}
      />
    );
  };

  const UserComponent = () => {
    return (
      <ListRequests
        type="in progress"
        items={orders.filter((order) => order.created_by.id === userId)}
        options={listPersonalOrdersOptions}
        clickHandler={() => {}}
        keyExtractor={keyExtractor}
      />
    );
  };

  return (
    <Tab.Navigator activeColor="#3D6DCC" inactiveColor="#3e2465">
      <Tab.Screen
        name="main"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="home" color={color} size={26} />
          ),
        }}
        component={Main}
      />
      <Tab.Screen
        name="inprogress"
        options={{
          tabBarLabel: "Active",
          tabBarIcon: ({ color }) => (
            <Icon
              type="font-awesome"
              name="exclamation"
              color={color}
              size={26}
            />
          ),
        }}
        component={() => InProgressComponent()}
      />
      <Tab.Screen
        name="available"
        options={{
          tabBarLabel: "Support",
          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="support" color={color} size={26} />
          ),
        }}
        component={() => OpenComponent()}
      />
      <Tab.Screen
        name="myrequests"
        options={{
          tabBarLabel: "My request",
          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="user" color={color} size={26} />
          ),
        }}
        component={() => UserComponent()}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  viewMap: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  title: {
    textAlign: "center",
  },
});

export default ListOrdersScreen;
