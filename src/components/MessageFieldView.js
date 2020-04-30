import React, { useState, useEffect } from 'react'
import {TextInput, StyleSheet, View, Button} from "react-native";
import Colors from '../utils/Colors'
import Constants from "../const/Constants";
import String from "../const/String";

const MessageFieldView = ({term, placeholder, onTermChange, onValidateTextField,onSubmit}) => {
    return(
        <View style={styles.containerView}>
            <View style={styles.fieldView}>
                <TextInput
                    autoColor={false}
                    style={styles.textField}
                    placeHolder={placeholder}
                    value={term}
                    onChageText={onTermChange}
                    onEndEdditing={onValidateTextField}

                />
                <Button
                    title={String.Send}
                    color={Colors.white}
                    onPress={onSubmit}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        backgroundColor: Colors.white,
        width: Constants.screenWidth,
        flex: 1,
        justifyContent:'space-between'
    },
    fieldView: {
        flex: 1,
        flexDirection:'row',
        backgroundColor: Colors.logocolor
    },
    textField: {
        fontSize: 14,
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        width: '75%',
        borderColor: Colors.gray,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Colors.smoke
    },
    Button: {
        flex: 1,
        alignSelf: 'center',
        width: '25%',
        height:'100%'
    }
})

export default MessageFieldView
