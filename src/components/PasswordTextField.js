import React from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native'

//import components
import Colors from "../utils/Colors";
import Constants from "../const/Constants";

const PasswordTextField = ({ term, placeHolder, OnTermChange, onValidatePasswordField, error }) => {
    return (
        <View>
            <Text style={style.ErrorText}>{error}</Text>
            <Text style={style.TextField}>
                <TextInput
                    autoCorrect={false}
                    style={style.TextField}
                    placeholder={placeHolder}
                    value={term}
                    onChangeText={OnTermChange}
                    onEndEditing={onValidatePasswordField}
                />
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    TextField: {
        fontSize: 14,
        flex: 1,
        marginHorizontal: 20
    },
    TextFieldView: {
        height: Constants.screenHeight * 0.06,
        weight: Constants.screenWidth * 0.85,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 5,
        borderColor: Colors.black,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Colors.smoke
    },
    ErrorText: {
        fontSize: 12,
        color: Colors.red,
        marginBottom: -5,
        marginHorizontal: 20
    }
})

export default PasswordTextField
