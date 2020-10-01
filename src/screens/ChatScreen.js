import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert } from "react-native";
import firebase, { firestore } from "../firebase/Firebase";
import MessageFieldView from "../components/MessageFieldView";
import String from "../const/String";
import DismissKeyboard from "../components/DismissKeyboard";
import MessageItem from "../components/MessageItem";

const ChatScreen = ({ route }) => {

    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState('')
    const [isJoined, setIsJoined] = useState(false)

    const { item } = route.params
    const userID = firebase.auth().currentUser.uid

    useEffect(() => {
        console.log(item)
        getUserJoinedAlreadyOrNot()
        getMessages()
    }, [])

    function getUserJoinedAlreadyOrNot() {
        firestore
            .collection('members')
            .doc(item.groupID)
            .collection('member')
            .where('userID','==', userID)
            .get().then((querySnaphot) => {
                if(querySnaphot.size > 0) {
                    querySnaphot.forEach((doc) => {
                        if(doc.data() != null ) {
                            setIsJoined(true)
                        } else {
                            setIsJoined(false)
                            showAlertToJoinGroup()
                        }
                    })
                } else {
                    showAlertToJoinGroup()
                }
        }).catch((error) => {
            console.log('Error getting documents: ', error)
        })
    }

    function showAlertToJoinGroup() {
        Alert.alert(
            String.JoinChat,
            String.JoinChatConfirmMessage,
            [{
                text: 'Yes',
                onPress: () => {
                    joinGroup()
                }
            }, {
                text: 'No',
                onPress: () => {

                }
            }
            ],
            {cancelable: false}
        )
    }

    function joinGroup() {
        const groupMemberRef = firestore.collection('members').doc(item.groupID).collection('member').doc()
        groupMemberRef.set({
            userID: userID
        }).then((docRef) => {
            setIsJoined(true)
            Alert.alert(String.joinMessage)
            setMessage('')
        }).catch((e) => {
            setIsJoined(false)
            Alert.alert(String.JoinGroupError)
        })
    }

    function getMessages() {
        const db = firestore
        let messages = []

        db.collection('message').doc(item.groupID).collection('message')
            .onSnapshot( snapshot => {
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
        const messageRef = firestore()
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
            console.log('Document written with ID ', messageRef.id, docRef)
            setMessage('')
        }).catch(e => {
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
                            placeholder={String.typeYourMessage}
                            onTermChange={message => setMessage(message)}
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
