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

    function sendMessagesToChat() {
        const MessageRef = firestore()
            .collection('message')
            .doc(item.groupID)
            .collection('messages')
            .doc()
        const userEmail = firebase.auth().currentUser.email

        messageRef.set({
            messageID: message.id,
            message: message,
            senderId: userID,
            senderEmail: userEmail
        }).then(docRef => {
            console.log('Document written with ID ', messageRef.id)
            setMessage('')
        }).catch((e) => {
            Alert.alert(e.message)
            console.log('Error', e)
        })
    }

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView
                style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
                behavior='padding'
                enabled
                keyboardVerticalOffset={100}
                >
                <View style={styles.container}>
                    <FlatList
                        style={styles.flatList}
                        data={messageList}
                        keyExtractor={(item, index) => 'key' + index}
                        rederItem={({item}) => {
                            return(
                                <TouchableOpacity onPress={() => {

                                }}>
                                    <MessageItem item={item} />
                                </TouchableOpacity>
                            )
                        }}
                    >
                    </FlatList>
                    <View style={styles.messageFieldView}>
                        <MessageFieldView
                            //term={message}
                            placeholder={String.typeYourMessage}
                            onTermChange={message => setMessage(message)}
                            //onSubmit={sendMessagesToChat}
                            onSubmit={sendMessagesToChat()}
                        >

                        </MessageFieldView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    flatList: {
        marginBottom: 10,
        flex: 0.9
    },
    messageFieldView: {
        flex: 0.1
    }

})

export default ChatScreen
