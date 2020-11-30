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
            />
            <TextInput
                style={styles.textInput}
                onChangeText={password => setPassword(password)}
                placeholder='Senha'
            />
            <HomePageButton
                title='Entrar'
                onPress={props.navigation.navigate('HomePage')}
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
})