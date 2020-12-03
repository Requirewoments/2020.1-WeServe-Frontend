import React, { useContext, useState } from 'react'
import { TextInput, View, StyleSheet, Alert } from 'react-native'
import HomePageButton from '../components/HomePageActionButton'
import { CommonActions } from '@react-navigation/native'

// Context 
import UserContext from '../context/UserContext'

export default props => {
    const { state, dispatch } = useContext(UserContext)
    if (state.user.email !== '' || true) {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'ServicesIndex' },
                ],
            })
        );
    }
    const [name, setName] = useState(state.user.name)
    const [username, setUsername] = useState(state.user.username)
    const [email, setEmail] = useState(state.user.email)
    const [password, setPassword] = useState(state.user.password)
    const [birthday, setBirthday] = useState(state.user.birthday)

    function confirmUpdate() {
        Alert.alert(
            "Confirmação:",
            "Tem certeza que deseja salvar as alterações?",
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "Criar conta",
                    onPress: () => sendNewUser()
                }
            ],
        )
    }

    function sendNewUser() {
        const new_user = {
            name: name,
            username: username,
            email: email,
            createdAt: state.user.createdAt,
            profilePhoto: state.user.profilePhoto,
            password: password,
            birthday: birthday,
        }
        console.warn(Object.values(new_user))
        dispatch({
            type: 'updateUser',
            payload: new_user,
        })
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'ServicesIndex' },
                ],
            })
        );
    }

    return (
        <View style={styles.form}>
            <TextInput
                style={styles.textInput}
                onChangeText={(name) => setName(name)}
                placeholder='Nome'
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(username) => setUsername(username)}
                placeholder='Username'
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(email) => setEmail(email)}
                placeholder='Email'
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(password) => setPassword(password)}
                placeholder='Senha'
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(birthday) => setBirthday(birthday)}
                placeholder='Data de nascimento'
            />
            <HomePageButton
                title='Criar conta'
                onPress={confirmUpdate}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 10,
    },
    textInput: {
        borderColor: '#000000',
        borderRadius: 5,
        height: 40,
        borderWidth: 1,
        padding: 10,
        margin: 10,
    },
    confirmButton: {

    }
})