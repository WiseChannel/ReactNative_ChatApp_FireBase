import React, {useState} from 'react'
import { StyleSheet, View, Alert, SafeAreaView, KeyboardAvoidingView,  } from "react-native";
import Button from "../components/Button";
import String from "../const/String";
import EmailTextField from "../components/EmailTextField";
import Colors from '../utils/Colors'
import Images from '../const/Images'
import Constants from "../const/Constants";
import DismissKeyboard from "../components/DismissKeyboard";
import Utility from "../utils/Utility";
import PasswordTextField from "../components/PasswordTextField";
import firebase from "firebase";

function SignInScreen({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState('')

    validateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(email)
        isValidEmail ? setEmailError('') : setEmailError(String.InvalidEmailAddress)

        return isValidEmail
    }

    validatePasswordField = () => {
        const isValidField = Utility.isValidField(password)
        isValidField ? setPasswordError('') : setPasswordError(String.PasswordFieldEmpty)

        return isValidField
    }

    performanceAuth = () => {
        const isValidEmail = validateEmailAddress()
        const isValidPassword = validatePasswordField()

        if(isValidEmail && isValidPassword) {
            setEmailError('')
            setPasswordError('')
            registration(email, password)
        }
    }

    registration = (email, password) => {
        try {
            setIsLoading(true)

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    setIsLoading(false)
                    navigation.reset({
                        index: 0,
                        routes:[{name: 'Groups Screen'}]
                    })
                    Alert.alert('Logged In ')
                }).catch((e) => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => {
                        setIsLoading(false)
                        navigation.reset({
                            index: 0,
                            routes:[{name: 'Groups Screen'}]
                        })
                        Alert.alert('Create a new user')
                    })
                    .catch((error) => {
                        setIsLoading(false)

                        console.log(error);
                        Alert.alert(error.message)
                    })
            })
        } catch(e) {
            setIsLoading(false)

            Alert.alert(error.message)
        }
    }

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding' enable
            >
                <View>
                    <SafeAreaView>
                        <Image style={styles.logo} source={Images.logo} />
                        <EmailTextField
                            term={email}
                            error={emailError}
                            placeHolder={String.EmailPlaceHolder}
                            OnTermChange={newEmail => {setEmail(newEmail)}}
                            onValidateEmailAddress={validateEmailAddress}
                        />
                        <PasswordTextField
                            term={password}
                            error={passwordError}
                            placeHolder={String.PasswordPlaceHolder}
                            OnTermChange={newPassword => {setPassword(newPassword)}}
                            onValidatePasswordField={validatePasswordField}
                        />
                        <Button
                            title={String.Join}
                            onPress={performAuth}
                            isLoading={isLoading}
                        />
                    </SafeAreaView>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
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
        backgroundColor: Colors.theme
    }
})

export default SignInScreen
