import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) : str;
};

class ServiceCard extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.container}
                underlayColor='#dadafa'
                onPress={() =>
                    this.props.navigation.navigate('ServiceView', { id: this.props.id})
                }>
                <View>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.service}>{this.props.category}</Text>
                    <Text style={styles.author}>Por: {truncate(this.props.author, 35) + (this.props.author.length > 35 ? '...' : '')}</Text>
                    <View style={styles.horizontalDivider}/>
                    <Text style={styles.description}>{this.props.description? truncate(this.props.description, 100): ''}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eaeafa',
        marginHorizontal: 10,
        padding: 5,
        marginTop: 10
    },
    title: {
        fontSize: 17,
        textAlign: 'center',
        paddingHorizontal: 10,
        fontFamily: 'Raleway-Bold',
        marginBottom: 5
    },
    service: {
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 10,
        fontFamily: 'Raleway-Normal',
    },
    author: {
        fontSize: 15,
        textAlign: 'center',
        paddingHorizontal: 10,
        fontFamily: 'Raleway-Italic',
        marginBottom: 5
    },
    description: {
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: 'Raleway-Medium'
    },
    horizontalDivider: {
        borderBottomColor: '#bababa',
        borderBottomWidth: 1,
        marginHorizontal: 10
    }
})

export default ServiceCard