import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileUser from './views/ProfileUser';
import HomePage from './views/HomePage';
import { Button, Icon } from 'react-native-elements';
import UpdateUser from './views/UpdateUser';

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
                <Stack.Screen
                    name="UpdateUser"
                    component={UpdateUser}
                    options={title.updateUser}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const title = {
    profileUser: ({ navigation }) => {
        return {
            title: 'Perfil de usuário',
            headerTitleStyle: {
            marginLeft: 15,
            fontSize: 25,
            },
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('UpdateUser')}
                    type='clear'
                    icon={<Icon name='edit' color='#000000'/> }
                />
            ),
        }
    },
    homePage: {
        title: 'WeServe',
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 25,
        },
    },
    updateUser: ({ navigation }) => {
        return {
            title: 'Atualizar cadastro',
            headerTitleStyle: {
                marginLeft: 15,
                fontSize: 25,
            },
            headerLeft: () => (
                <Button
                    onPress={() => navigation.goBack()}
                    type='clear'
                    icon={<Icon name='close' color='#000000'/> }
                />
            ),
        }
    },
};
