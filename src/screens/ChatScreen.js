import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert, Button } from "react-native";
import firebase, {firestore} from "firebase";
import MessageFieldView from "../components/MessageFieldView";
import Colors from '../utils/Colors'
import Constants from "../const/Constants";
import String from "../const/String";
import DismissKeyboard from "../components/DismissKeyboard";
import MessageItem from "../components/MessageItem";

const ChatScreen = ({ route, navigation }) => {
    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState('')
    const [isJoined, setIsJoined] = useState(false)

    const {item} = route.params
    const userID = firebase.auth().currentUser.uid

    useEffect(() => {
        console.log(item)
        getMessages()
    }, [])

    function getMessages() {
        const db = firestore()
        let messages = []

        db.collection('message').doc(item.groupID).collection('message')
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if(change.type === 'added') {
                        console.log('New Message', change.doc.data())
                        messages.push(change.doc.data())
                    }
                    if(change.type === 'modified') {
                        console.log('Modified Message', change.doc.data())
                    }
                    if(change.type === 'removed') {
                        console.log('Removed Message', change.doc.data())
                    }

                    setMessageList(messages)
                })
            })
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>ChatScreen screen</Text>
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

export default ChatScreen
