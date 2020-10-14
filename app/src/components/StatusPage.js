import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Linking } from 'react-native'


export const StatusInProgress = ({ styles, order, setShowReport }) => {

    return (
        <View style={{ width: "100%", flexDirection: "column" }}>
            <View style={{ width: "100%" }}>
                <Text style={{ fontSize: 16, marginVertical: 10, textAlign: "center" }}>
                    The order has been taken  by {order.accepted_by.name} {order.accepted_by.surname}
                </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <View style={{ width: "33.3%" }}>
                    <TouchableOpacity
                        style={[styles.buttonStyle, styles.acceptStyle]}
                        onPress={() => Linking.openURL(`tel:${order.accepted_by.phone}`)}
                    >
                        <Text>Call</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "33.3%" }}>
                    <TouchableOpacity
                        style={[styles.buttonStyle, styles.acceptStyle]}
                        onPress={setShowReport}
                    >
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export const StatusOpen = ({ styles, setCancelOrder }) => {
    return (
        <View style={{ width: "100%" }}>
            <TouchableOpacity
                style={[styles.buttonStyle, styles.cancelStyle]}
                onPress={setCancelOrder}
            >
                <Text>Cancel order</Text>
            </TouchableOpacity>
        </View>
    )
}