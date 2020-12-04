import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


class ServiceView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            category: '',
            description: '',
            refreshing: false
        }
        this.props.navigation.addListener('focus', e => {
            this.fetchService(this.state.id)
        });
    }

    componentDidMount() {
        const params = this.props.route.params
        this.setState(params)
        this.fetchService(params.id)
    }

    async fetchService(id) {
        let response = {}
        
        await fetch("https://requisitos-weserve.herokuapp.com/service/" + id)
            .then(e => e.text())
            .then(e => response = JSON.parse(e))
            .catch(e => console.log('REQUEST ERROR:', e))
        
        this.setState(response)
    }

    render() {
        return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl 
                    refreshing={this.state.refreshing} 
                    onRefresh={() => {
                        this.fetchService()
                    }}/>
            }>
            <Text
                style={styles.title}>
                {this.state.title}
            </Text>
            <Text
                style={styles.authorcategory}>
                {this.state.category} de {this.state.author}
            </Text>
            <View
                style={styles.descriptioncontainer}>
                    <Text>
                        {this.state.description}
                    </Text>
            </View>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        backgroundColor: '#fafafa',
        paddingTop: 10
    },
    title: {
        fontFamily: 'Raleway-Bold',
        fontSize: 25,
        textAlign: 'center'
    },
    authorcategory: {
        fontFamily: 'Raleway-Light',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    },
    descriptioncontainer: {
        borderWidth: 0.2,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 20
    }
})

export default ServiceView
