import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

//import components
import SignInScreen from "../screens/SignInScreen";
import GroupsScreen from "../screens/GroupsScreen";
import AddGroupScreen from "../screens/AddGroupScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator()

const ChatFlow = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator name = 'Chat'>
                <Stack.Screen
                    name='Sign in screen'
                    component = {SignInScreen}
                    options = {{ headerShow = false }}
                />
                <Stack.Screen
                    name='Groups Screen'
                    component = {GroupsScreen}
                    options = {{ title = 'Groups' }}
                />
                <Stack.Screen
                    name='Add group Screen'
                    component = {AddGroupScreen}
                    options = {{ title = 'add group screen' }}
                />
                <Stack.Screen
                    name='Chat Screen'
                    component = {ChatScreen}
                    options = {{ title = 'Chat screen' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}