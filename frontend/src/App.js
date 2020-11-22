import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileUser from './views/ProfileUser';
import HomePage from './views/HomePage';

const Stack = createStackNavigator();

export default (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen
                    name="ProfileUser"
                    component={ProfileUser}
                    options={title.profileUser}
                />
                <Stack.Screen
                    name="HomePage"
                    component={HomePage}
                    options={title.homePage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const title = {
    profileUser: {
        title: 'Perfil de usuário',
        headerTitleStyle: {
            marginLeft: 15,
            fontSize: 25,
        },
    },
    homePage: {
        title: 'WeServe',
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 25,
        },
    },
};
