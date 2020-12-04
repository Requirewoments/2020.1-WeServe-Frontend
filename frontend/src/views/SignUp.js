import React, { Component } from 'react'
import { TextInput, View, StyleSheet, Alert } from 'react-native'
import HomePageActionButton from '../components/HomePageActionButton'
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Globals from '../context/Globals'

class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: 'natin',
            username: 'renatin',
            email: 'natin@aaa.com',
            createdAt: 'awdawd',
            profilePhoto: '',
            password: 'Qweasdzxc123',
            birthday: 'awdawdwad'
        }
    }

    finishSignUp(data){
        AsyncStorage.setItem('user', JSON.stringify(data))
        this.props.navigation.replace('ServicesIndex')
    }

    async sendNewUser() {
        const new_user = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            createdAt: this.state.createdAt,
            profilePhoto: this.state.profilePhoto,
            password: this.state.password,
            birthday: this.state.birthday,
        }

        const url_request = Globals.server_ip + '/user/'
        let success = true
        let payload = {
            name: new_user.name,
            email: new_user.email,
            password: new_user.password,
            username: new_user.username
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
                .then(e => JSON.stringify(e))
                .catch(e => {
                    console.log('REQUEST ERROR:', e)
                    success = false
                })
        if (!success) {
            this.showError("Email inválido", "Já está em uso.")
        } else {
            this.finishSignUp(ret)
        }
    }

    validateFields(){
        if (!this.validateEmail(this.state.email)){
            this.showError(
                "Email invalido",
                "Insira um email válido"
            )
            return;
        }
        if (!this.validatePassword(this.state.password)){
            this.showError(
                "Senha inválida", 
                "A senha deve possuir ao menos um numero, uma letra maiuscula e outra minuscula"
            )
            return;
        }
        this.sendNewUser()
    }
    
    validatePassword(password) {
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        return (reg.test(password) && password.length >= 6 && password.length <= 20)
    }
    
    validateEmail(email) {
        const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return reg.test(email);
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
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name: name})}
                    placeholder='Nome'/>
                <TextInput
                    style={styles.textInput}
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username: username})}
                    placeholder='Username'/>
                <TextInput
                    style={styles.textInput}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email: email})}
                    placeholder='Email'/>
                <TextInput
                    style={styles.textInput}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password: password})}
                    placeholder='Senha'/>
                <TextInput
                    style={styles.textInput}
                    value={this.state.birthday}
                    onChangeText={(birthday) => this.setState({birthday: birthday})}
                    placeholder='Data de nascimento'/>
                <HomePageActionButton
                    title='Criar conta'
                    onPress={() => this.validateFields()}/>
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
    confirmButton: {

    }
})

export default SignUp