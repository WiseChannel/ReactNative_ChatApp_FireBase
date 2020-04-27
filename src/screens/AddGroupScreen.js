import React, {useLayoutEffect, useState, useEffect} from 'react'
import { StyleSheet, View, Text, Alert } from "react-native";
import CustomTextField from "../components/CustomTextField";
import Button from "../components/Button";
import Colors from "../utils/Colors"
import String from "../const/String";
import Utility from "../utils/Utility";
import firebase, {fireStore} from "firebase";

const AddGroupScreen = ({ navigation, performCreateGroup }) => {

    const [groupName, setGroupName] = useState('')
    const [fieldError, setFieldError] = useState('')
    const [isLoading, setIsLoading] = useState('')

    const validateField = () => {
        const isValidateField = Utility.isValidField(groupName)
        isValidateField ? setFieldError('') : setFieldError(String.GroupNameEmpty)

        return isValidateField
    }

    function createGroupFireBase() {
        setIsLoading(true)
        const groupRef = fireStore().collection('groups')
        const userID = firebase.auth().currentUser.uid

        groupRef.set({
            groupID: groupsRef.id,
            groupName: groupName,
            userID: userID,
        }).then(function (docRef) {
            setIsLoading(false)
            console.log('Document written with ID: ', groupRef.id)
            addMembersOfChatToFirebae(groupRef.id, userID)
        }).catch(function (error) {
            Alert.alert(error.message)
            setIsLoading(false)
            console.error('Error: ', error)
        })
    }

    function addMembersOfChatToFirebae (groupId,userId) {
        const memebersRef = fireStore()
            .collection('memeber')
            .doc(groupId)
            .collection('memeber')
            .doc()
        memebersRef.set({
            userID: userID,
        }).catch(function (error) {
            setIsLoading(false)
            console.log(error)
        })
    }

    performCreateGroup = () => {
        const isValidateField = validateField()
        if(isValidateField) {
            createGroupFireBase()
        }
    }

    useLayoutEffect(() => {
        navigation.setOption({
            headerRight: () => {

            },
            headerLeft: () => {

            }
        })
    })

    return (
        <View style = {styles.container}>
            <CustomTextField
                term={groupName}
                error={fieldError}
                placeHolder={Strings.EnterYourGroupName}
                onTermChange={newGroupName => setGroupName(newGroupName)}
                onValidateTextField={validateField}
            />
            <Button
                title={String.CreateGroup}
                onPress={createGroupFireBase}
                isLoading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold',
    }
})

export default AddGroupScreen
