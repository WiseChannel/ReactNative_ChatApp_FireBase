import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import Constants from "../const/Constants";
import Images from '../const/Images'
import Colors from "../utils/Colors";

function GroupItem({ item }) {
    return (
        <View>
            <View styles={styles.container}>
                <Image
                    source={Images.groups}
                    style={styles.Image}
                />
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.groupTitle}>
                        {item.groupName}
                    </Text>
                    <Text styles={styles.groupMemebers}>
                        {item.groupMemebers}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        width: Constants.screenWidth,
        margin: 10
    },
    descriptionContainer: {
        margin: 5
    },
    Image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        shadowColor: Colors.gray,
        shadowRadius: 2,
        backgroundColor: Colors.theme
    },
    groupTitle: {
        color: Colors.gray,
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    separator: {
        height: 0.5,
        width: Constants.screenWidth,
        backgroundColor: Colors.theme
    },
    groupMemebers: {
        color: Colors.smoke,
        fontSize: 14
    }
})

export default GroupItem
