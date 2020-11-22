import React, { Component } from 'react'
import {Text, StyleSheet, View, Button} from 'react-native'

export default class HomePage extends Component {
    render(){
        return (
            <View>
                <Text style={styles.title}>HomePage</Text>
                <Button
                    title='Perfil de usuário'
                    onPress={() => this.props.navigation.navigate('ProfileUser') }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf:'center',
        fontWeight:'bold',
        fontSize: 25,
    }
})