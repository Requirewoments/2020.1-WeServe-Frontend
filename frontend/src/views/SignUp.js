import React, { useContext, useState } from 'react'
import { TextInput, View, StyleSheet, Alert } from 'react-native'
import HomePageButton from '../components/HomePageActionButton'
import { CommonActions } from '@react-navigation/native'

// Context 
import UserContext from '../context/UserContext'
import Globals from '../context/Globals'

export default props => {
    const { state, dispatch } = useContext(UserContext)
    
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

    function finishSignUp(e, new_user){
        if (e.status === 400){
            showError("Email invalido", "O email ja foi cadastrado")
            return
        }
        dispatch({
            type: 'createUser',
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
        const url_request = Globals.server_ip + '/user'

        fetch(url_request, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: new_user.name,
                email: new_user.email,
                password: new_user.password,
                username: new_user.username,
            })
        }).then((e) => finishSignUp(e, new_user)).catch((e) => {
            showError("Email invalido", "Esse email ja foi cadastrado")
            console.warn(new_user)
        });
    }

    function validateFields(){
        if (!validateEmail(email)){
            showError(
                "Email invalido",
                "Insira um email válido"
            )
            return;
        }
        if (!validatePassword(password)){
            showError(
                "Senha inválida", 
                "A senha deve possuir ao menos um numero, uma letra maiuscula e outra minuscula"
            )
            return;
        }
        confirmUpdate()
    }
    
    function validatePassword(){
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        return (reg.test(password) && password.length >= 6 && password.length <= 20)
    }
    
    function validateEmail(){
        const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return reg.test(email);
    }
    
    function showError(title, messege){
        Alert.alert(
            title,
            messege,
            [
                {
                    text: 'OK',
                },
            ]
        )
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
                onPress={validateFields}
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