import React from 'react'
import {
    TextInput, Text, StyleSheet, View
} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import Constants from "../const/Constants";

const EmailTextField = ({ term, placeHolder, onTermChange, onValidateEmailAddress, error }) => {
    return (
        <View>
            <Text style={styles.ErrorText}>{ error }</Text>
            <View style={styles.TextFieldView}>
                <TextInput
                    autoCorrect={false}
                    style={styles.TextField}
                    placeholder={placeHolder}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidateEmailAddress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TextField: {
        fontSize: 14,
        flex: 1,
        marginHorizontal: 20
    },
    TextFieldView: {
        height: Constants.screenHeight * 0.06,
        width: Constants.screenWidth * 0.85,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        justifyContent: 'center'
    },
    ErrorText: {
        fontSize: 12,
        color: Colors.red,
        marginBottom: -5,
        marginHorizontal: 20,
    }
})

export default EmailTextField
