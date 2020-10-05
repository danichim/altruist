import * as React from "react";
import {useState} from "react";
import Request from "./Request";
import {Text, View, StyleSheet} from "react-native";
import TopBar from "./TopBar";
import Help from "./Help";
import {useContext} from "react";
import {AuthContext} from "../../../App";

const Main = ({navigation}) => {
  const [view, setView] = useState('Help');
  const { authContext: {getAllOrders} } = useContext(AuthContext);

  const showHelpView = () => {
    getAllOrders();
    setView('Help');
  }

  const showRequestView = () => setView('Request');

  return (
    <View style={{flex: 1}}>
      <TopBar showHelpView={showHelpView} showRequestView={showRequestView}/>
      {view === 'Request' ? <Request /> : <Help navigation={navigation} />}
    </View>
  )
};

export default Main;
