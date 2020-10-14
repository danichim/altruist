import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ReportView } from "./ShowReport";


export const ShowDialog = ({ styles, setThankyou, setShowModal, showModal, setOnReport, setSubject, setMessage }) => {
    return (
        <View style={{ width: "100%" }}>
            {showModal ? <ReportView styles={styles} getSubject={setSubject} getMessage={setMessage} setOnReport={setOnReport} /> :
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <View style={{ width: "49%" }}>
                        <TouchableOpacity
                            style={[styles.buttonStyle, styles.acceptStyle]}
                            onPress={() => setShowModal(true)
                            }
                        >
                            <Text>Report</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "49%" }}>
                        <TouchableOpacity
                            style={[styles.buttonStyle, styles.acceptStyle]}
                            onPress={setThankyou}
                        >
                            <Text>Thank you</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
        </View >
    )
}


