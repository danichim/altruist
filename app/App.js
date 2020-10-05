import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-elements";
import {Alert, AsyncStorage} from "react-native";
import { useEffect } from "react";
import { useReducer } from "react";
import axios from "axios";
import { API_URL } from "./src/constants/constant";
import { StyleSheet } from "react-native";
import Topbar from "./src/components/Topbar";
import RequestOrder from "./src/screens/RequestOrder";
import LoginScreen from "./src/screens/LoginScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RegisterScreen from "./src/screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { useContext } from "react";
import Orders from "./src/screens/Orders";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as Location from "expo-location";
import Main from "./src/screens/Main/Main";
import ListOrdersScreen from "./src/screens/ListOrdersScreen";
console.disableYellowBox = true;
const theme = {
  Button: {
    raised: false,
  },
};

axios.interceptors.request.use(
  async (config) => {
    if (!config.url.includes("auth")) {
      const { token } = JSON.parse(await AsyncStorage.getItem("user"));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export const AuthContext = React.createContext();
const Stack = createStackNavigator();

const RootDrawer = (props) => {
  const provider = useContext(AuthContext);
  const { token } = provider.state;

  return (
    <>
      <Topbar isAuth={token} navigation={props.navigation} />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login"
      >
        {!token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="ListOrders"
              component={ListOrdersScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

const App = (props) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGN_IN":
          return {
            ...prevState,
            userId: action.userId,
            token: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            userId: null,
            token: null,
          };
        case "BACK_TO_SCREEN":
          return {
            ...prevState,
            back: action.payload,
          };
        case "SET_ORDERS":
          return {
            ...prevState,
            orders: action.payload,
          };
      }
    },
    {
      userId: null,
      token: null,
      orders: [],
      back: false,
    }
  );
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let user;

      try {
        user = await AsyncStorage.getItem("user");
        user = JSON.parse(user);
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: "SIGN_IN", ...user });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signUp: async (data) => {

        const {latitude, longitude} = await getUserLocation();
        if (!latitude || !longitude) {
          Alert.alert("Alert", "We need your location.", [
            {
              text: "OK",
            },
          ]);
          return;
        }
        axios
          .post(`${API_URL}/auth/login`, {...data, latitude, longitude})
          .then(async (response) => {
            const data = {
              token: response.data.access_token,
              userId: response.data.id,
            };
            await AsyncStorage.setItem("user", JSON.stringify(data));
            authContext.getAllOrders();
            dispatch({ type: "SIGN_IN", ...data });
          })
          .catch((err) => {
            Alert.alert("Alert", "Incorrect username and password.");
          });
      },
      getAllOrders: async () => {
        const getOrders = axios.get(`${API_URL}/order/gps`);
        const getActiveOrders = axios.get(`${API_URL}/order`);

        axios
          .all([getActiveOrders, getOrders])
          .then(
            axios.spread((...responses) => {
              const myOrders = responses[0].data.orders;
              const inPr = responses[0].data.volunteer_orders;
              const ordersGps = responses[1].data;
              
              dispatch({ type: "SET_ORDERS", payload: [...myOrders, ...inPr, ...ordersGps] });
            })
          )
          .catch((errors) => {
            // react on errors.
            console.log(errors);
          });
      },
      signOut: async () => {
        dispatch({ type: "SIGN_OUT" });
        await AsyncStorage.removeItem("user");
      },
      backToScreen: (value) =>
        dispatch({ type: "BACK_TO_SCREEN", payload: value }),
    }),
    []
  );

  const getUserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      return false;
    }

    let location = await Location.getCurrentPositionAsync({});
    const {latitude, longitude} = location.coords;

    return {latitude, longitude};
  };


  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthContext.Provider value={{ authContext, state }}>
          <Stack.Navigator>
            <Stack.Screen
              name="RootDrawer"
              component={RootDrawer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
