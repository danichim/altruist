import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { Input } from "react-native-elements";

export const ReportView = ({ styles, getSubject, getMessage, setOnReport }) => {

    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getSubject(subject);
    });

    useEffect(() => {
        getMessage(message);
    });


    return (
        <View style={{ alignItems: "center" }}>
            <View style={styles.input}>
                <Input
                    containerStyle={{ borderWidth: 0 }}
                    style={{ borderWidth: 0, height: 100 }}
                    multiline
                    name="title"
                    placeholder="Title"
                    value={subject}
                    onChangeText={(text) => setSubject(text)}
                />
            </View>
            <View style={styles.input}>
                <Input
                    containerStyle={{ borderWidth: 0 }}
                    inputContainerStyle={{ borderWidth: 0 }}
                    inputStyle={{ borderWidth: 0, height: 100 }}
                    multiline
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
            </View>
            <View style={{ width: "33.3%" }}>
                <TouchableOpacity
                    style={[styles.buttonStyle, styles.acceptStyle]}
                    onPress={setOnReport}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}