import React, { useContext, useState } from 'react'
import { TextInput, View, StyleSheet, Button, Alert } from 'react-native'
import HomePageButton from '../components/HomePageActionButton'

// Context 
import UserContext from '../context/UserContext'

export default props => {
    const [email, setEmail] = useState({})
    const [password, setPassword] = useState({})

    return (
        <View style={styles.form}>
            <TextInput
                style={styles.textInput}
                onChangeText={email => setEmail(email)}
                placeholder='Email'
                keyboardType='email-address'
                />
            <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={password => setPassword(password)}
                placeholder='Senha'
            />
            <HomePageButton
                title='Entrar'
                onPress={() => {
                    const canSubmit  = validateFields(email, password) 
                }}
            />
        </View>
    )
}

function validateFields(email, password){
    if (!validateEmail(email)){
        showError("Email invalido","Insira um email válido")
        return false;
    }
    if (!validatePassword(password)){
        showError("Senha inválida", "Sua senha deve conter 6-20 caracteres, entre eles no mínimo um número, uma letra maiúscula e uma minúscula")
        return false;
    }
    return true;
}

function validatePassword(password){
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/gm
    return (reg.test(password) && password.length >= 6 && password.length <= 20)
}

function validateEmail(email){
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
    passwordForm: {

    },
})