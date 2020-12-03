import React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Icon } from 'react-native-elements';

// CRUD Serviços
import ServicesIndex from './views/ServicesIndex'
import ServiceView from './views/ServiceView'
import ServiceSubmit from './views/ServiceSubmit'
import ServiceEdit from './views/ServiceEdit'

// CRUD User
import ProfileUser from './views/ProfileUser';
import UpdateUser from './views/UpdateUser';
import SignUp from './views/SignUp';
import Login from './views/Login'

// CRUD Messages
import MessagesIndex from './views/MessagesIndex'
import MessageView from './views/MessageView'

// Context user
import { UserProvider } from './context/UserContext';

// Work need
import NeedIndex from './views/NeedIndex'
import NeedSubmit from './views/NeedSubmit'

const Stack = createStackNavigator();

export default (props) => {
    return (
        <UserProvider style={{fontFamily: 'Raleway-Normal'}}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="NeedSubmit"
                        component={NeedSubmit}
                        options={title.needSubmit}
                    />
                    <Stack.Screen
                        name="NeedIndex"
                        component={NeedIndex}
                        options={title.needIndex}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={title.login}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={title.signUp}
                    />
                    <Stack.Screen
                        name="ProfileUser"
                        component={ProfileUser}
                        options={title.profileUser}
                    />
                    <Stack.Screen
                        name="UpdateUser"
                        component={UpdateUser}
                        options={title.updateUser}
                    />
                    <Stack.Screen
                        name="ServicesIndex"
                        component={ServicesIndex}
                        options={title.ServicesIndex}
                    />
                    <Stack.Screen
                        name="ServiceView"
                        component={ServiceView}
                        options={title.ServiceView}
                    />
                    <Stack.Screen
                        name="ServiceSubmit"
                        component={ServiceSubmit}
                        options={title.ServiceSubmit}
                    />
                    <Stack.Screen
                        name="ServiceEdit"
                        component={ServiceEdit}
                        options={title.ServiceEdit}
                    />
                    <Stack.Screen
                        name="MessagesIndex"
                        component={MessagesIndex}
                        options={title.MessagesIndex}
                    />
                    <Stack.Screen
                        name="MessageView"
                        component={MessageView}
                        options={title.MessageView}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
};

const title = {
    profileUser: ({ navigation }) => {
        return {
            title: 'Perfil de usuário',
            headerTitleStyle: {
            marginLeft: 15,
            fontSize: 25,
            fontFamily: 'Raleway-Normal'
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
    updateUser: ({ navigation }) => {
        return {
            title: 'Atualizar cadastro',
            headerTitleStyle: {
                marginLeft: 15,
                fontSize: 25,
                fontFamily: 'Raleway-Normal'
            },
            headerLeft: () => (
                <Button
                    onPress={() => navigation.goBack()}
                    type='clear'
                    icon={<Icon name='close' color='#85bec9'/> }
                />
            ),
        }
    },
    ServicesIndex: ({ navigation }) => {
        return {
            title: 'WeServe',
            headerTitleStyle: {
                marginLeft: 15,
                fontSize: 20,
                fontFamily: 'Raleway-Bold',
                textAlign: 'left'
            },
            headerRight: () => (
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Button
                    onPress={() => navigation.navigate('ProfileUser')}
                    type='clear'
                    icon={<Icon name='account-circle' color='#26c1e0'/> }/>
                </View>
            ),
        }
    },
    ServiceEdit: ({ navigation }) => {
        return {
            title: 'Editar Serviço',
            headerTitleStyle: {
                fontSize: 20,
                fontFamily: 'Raleway-Bold',
                textAlign: 'left',
                marginBottom: 5
            },
        }
    },
    ServiceSubmit: ({ navigation }) => {
        return {
            title: 'Serviço novo',
            headerTitleStyle: {
                fontSize: 20,
                fontFamily: 'Raleway-Bold',
                textAlign: 'left'
            },
        }
    },
    ServiceView: ({ navigation, route }) => {
        return {
            title: 'Serviço',
            headerTitleStyle: {
                fontSize: 20,
                fontFamily: 'Raleway-Bold',
                textAlign: 'left'
            },
            headerRight: () => (
                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                    <Button
                        onPress={async () => {
                            await fetch("https://requisitos-weserve.herokuapp.com/service/" 
                                + route.params.id, {
                                method: 'DELETE'
                            })
                            navigation.navigate('ServicesIndex')
                        }}
                        type='clear'
                        icon={<Icon name='delete' color='#000000'/> }
                        />
                    <Button
                        onPress={() => navigation.navigate('ServiceEdit', {
                            id: route.params.id
                        })}
                        type='clear'
                        icon={<Icon name='edit' color='#000000'/> }
                        />
                </View>
            ),
        }
    },
    MessagesIndex: {
        title: 'Suas mensagens'
    },
    MessageView: {
        title: 'Mensagens'
    },
    signUp: {
        title: 'Criar conta'
    },
    login: ({navigation}) => {
        return {
            headerRight: () => (
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Button
                    onPress={() => navigation.navigate('SignUp')}
                    type='clear'
                    icon={<Icon name='add' color='#26c1e0'/> }/>
                </View>
            ),
        }
    },
    needSubmit: {
        title: 'Nova Necessidade',
    },
    needIndex: ({navigation}) => {
        return {
            title: "Necessidade",
            headerRight: () => (
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                <Button
                    onPress={() => navigation.navigate('NeedSubmit')}
                    type='clear'
                    icon={<Icon name='add' color='#26c1e0'/> }/>
                </View>
            ),
        }
    },
};
