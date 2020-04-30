import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import ButtonWithBackground from "../components/ButtonWithBackground";
import Images from '../const/Images'
import GroupItem from "../components/GroupsItems";
import firebase, {firestore} from "firebase";

function GroupsScreen({navigation})  {

    const [groups, setGroups] = useState([])

     useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonWithBackground
                    onPress={() => {
                        navigation.navigate('Add Group Screen')
                    }}
                    image={Images.add}
                />
            ),
            headerLeft: () => (
                <ButtonWithBackground
                    onPress={() => {
                        signOutUser()
                    }}
                    image={Images.logout}
                />
            )
        })
    });

    const signOutUser = async () => {
        try{
            await firebase.auth().signOut()
        }catch (e) {
            console.error('Err', e)
        }
    }

    function getCharts() {
        const db = firestore
        let groupArray = []

        db.collection('groups')
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach((change) => {
                    if(change.type === 'added') {
                        console.log('New Group', change.doc.data())
                        groupArray.push(change.doc.data())
                    }
                    if(change.type === 'modified') {
                        console.log('Modified Group', change.doc.date())
                    }
                    if(change.type === 'removed') {
                        console.log('Removed Group', change.doc.date())
                    }

                    setGroups(groupArray)
                })
            })
    }

    useEffect(() => {
        getCharts()
    }, [])

    return (
        <View style = {styles.container}>
            <FlatList
                data={groups}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Chat Screen', {})
                            }}
                        >
                            <GroupItem item={item} />
                        </TouchableOpacity>
                    )
                }}
            >
            </FlatList>
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
