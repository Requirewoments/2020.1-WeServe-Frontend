import { ThemeProvider } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';

export default class ProfileUser extends Component {
    
    user = {
        id: 1,
        name: 'Jubiscraudio',
        username: 'Jubisnocaudio',
        email: 'jubiscaca@nocaudio.com',
        startDate: '21/11/2020',
        profilePhoto:
            'https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868-1024x909.jpg',
    };

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={{ uri: this.user.profilePhoto }} />
                <View style={styles.textContainer}>
                    <Text style={styles.textLabel}>Nome:</Text>
                    <Text style={styles.text}>{this.user.name}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textLabel}>Email:</Text>
                    <Text style={styles.text}>{this.user.email}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textLabel}>Username:</Text>
                    <Text style={styles.text}>{this.user.username}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textLabel}>Membro Desde:</Text>
                    <Text style={styles.text}>{this.user.startDate}</Text>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 400,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    textInput: {
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 15,
        marginTop: 10,
    },
    textLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    textContainer: {
        marginBottom: 5,
    },
});
