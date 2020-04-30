import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Color from '../utils/Colors'
import Images from '../const/Images'
import Constants from "../const/Constants";
import firebase from "firebase";

function SplashScreen({ navigation }) {

    useEffect(() => {
        NavigationToAuthORGroupScreens()
    },[navigation])

    function NavigationToAuthORGroupScreens() {
        const { currentUser } = firebase.auth()
        setTimeout(() => {
            if (currentUser != null) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Groups Screen'}]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'SignInScreen'}]
                })
            }
        }, 1000)
    }

    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={Images.logo}
            >

            </Image>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        margin: 0.04 * Constants.screenHeight
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.theme
    }
})

export default SplashScreen
