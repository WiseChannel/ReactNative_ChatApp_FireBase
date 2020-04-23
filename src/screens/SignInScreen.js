import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Alert, SafeAreaView, KeyboardAvoidingView,  } from "react-native";
import Button from "../components/Button";
import String from "../const/String";
import EmailTextField from "../components/EmailTextField";
import Colors from '../utils/Colors'
import Images from '../const/Images'
import Constants from "../const/Constants";
import DismissKeyboard from "../components/DismissKeyboard";
import Utility from "../utils/Utility";
import PasswordTextField from "../components/PasswordTextField";

function SignInScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState('')

     const validateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(email)
        isValidEmail ? setEmailError('') : setEmailError(String.InvalidEmailAddress)

        return isValidEmail
    }

     const validatePasswordField = () => {
        const isValidField = Utility.isValidField(password)
        isValidField ? setPasswordError('') : setPasswordError(String.PasswordFieldEmpty)

        return isValidField
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
                            OnTermChange={newEmail => setEmail(newEmail)}
                            onValidateEmailAddress={validateEmailAddress}
                        />
                        <PasswordTextField
                            term={password}
                            error={passwordError}
                            placeHolder={String.PasswordPlaceHolder}
                            OnTermChange={newPassword => {setPassword(newPassword)}}
                            onValidatePasswordField={validatePasswordField}
                        />
                        <Button title={String.Join}/>
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
