import React, { Component, useContext, useState } from 'react'
import { TextInput, View, StyleSheet, Button, Alert } from 'react-native'
import HomePageButton from '../components/HomePageActionButton'
import auth from '../helpers/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Context 
import UserContext from '../context/UserContext'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.validateAlreadyLoggedIn()
    }
    
    async validateAlreadyLoggedIn() {
       try {
            await auth.getUserData()
            this.props.navigation.replace('ServicesIndex')
        } catch (e) {}
    }

    validateFields(){
        const email = this.state.email
        const password = this.state.password
        if (!this.validateEmail(email)){
            this.showError("Email invalido","Insira um email válido")
            return
        }
        if (!this.validatePassword(password)){
            this.showError("Senha inválida", "A senha contem 6-20 caracteres, entre eles no mínimo um número, uma letra maiúscula e uma minúscula")
            return
        }
        this.login()
    }
    
    validatePassword(password){
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/gm
        return (reg.test(password) && password.length >= 6 && password.length <= 20)
    }
    
    validateEmail(email){
        const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return reg.test(email);
    }

    async login() {
        const url_request = Globals.server_ip + '/user/auth'

        let success = true

        let payload = {
            password: this.state.password,
            email: this.state.email
        }
        const ret = await fetch(url_request, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
                .then(e => e.text())
                .then(e => JSON.parse(e))
                .catch(e => {
                    console.log('REQUEST ERROR:', e)
                    success = false
                })
        if (!success) {
            this.showError("Não foi possível fazer o login", "Tente de novo.")
        } else {
            this.finishLogin(ret.user)
        }
    }

    finishLogin(data){
        AsyncStorage.setItem('user', JSON.stringify(data))
        this.props.navigation.replace('ServicesIndex')
    }

    
    showError(title, messege){
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

    render() {
        return (
            <View style={styles.form}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={email => this.setState({email: email})}
                    placeholder='Email'
                    keyboardType='email-address'
                    />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={password => this.setState({password: password})}
                    placeholder='Senha'
                    />
                <HomePageButton
                    title='Entrar'
                    onPress={() => {
                        this.validateFields() 
                    }}
                    />
            </View>
        )
    }
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

export default Login 