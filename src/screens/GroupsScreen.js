import React from 'react'
import { StyleSheet, View, Text } from "react-native";

const GroupsScreen = () => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>GroupsScreen screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold',

    }

})

export default GroupsScreen
