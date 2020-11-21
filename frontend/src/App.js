import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileUser from './views/ProfileUser'
import HomePage from './views/HomePage'

const Stack = createStackNavigator()

export default props => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="ProfileUser">
                <Stack.Screen
                    name="ProfileUser"
                    component={ProfileUser}
                />
                <Stack.Screen
                    name="HomePage"
                    component={HomePage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}