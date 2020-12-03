import React, { Component } from 'react'
import { 
    StyleSheet,
    ScrollView,View,
    RefreshControl,
    Text
} from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

import ServiceCard from '../components/ServiceCard'
import HomePageActionButton from '../components/HomePageActionButton'

class Services extends Component {

    constructor(props) {
        super(props)

        this.state = {
            services: [],
            refreshing: false,
        }

        this.props.navigation.addListener('focus', e => {
            this.fetchServices()
        });
    }

    componentDidMount() {
        this.fetchServices()
    }

    async fetchServices() {
        let services = []
        
        await fetch("http://192.168.0.4:3003/service/")
            .then(response => response.text())
            .then(result => {
                services = JSON.parse(result)
            })
            .catch(error => console.log('REQUEST ERROR:', error))
        
        services.map(e => {
            let obj = e
            obj.id = e['_id']
            delete obj['_id']
            return obj
        })

        this.setState({ services: services })
    }

    render() {
        return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl 
                    refreshing={this.state.refreshing} 
                    onRefresh={() => {
                        this.fetchServices()
                    }}/>
            }>
            <View style={styles.createservicebutton}>
                <HomePageActionButton
                    title="Oferecer/Solicitar serviço"
                    onPress={() => this.props.navigation.navigate('ServiceSubmit')}/>
            </View>
            <View style={styles.createservicebutton}>
                <HomePageActionButton
                    title="Necessidades de trabalho"
                    onPress={() => this.props.navigation.navigate('NeedIndex')}
                    />
            </View>
            <View style={styles.horizontalDivider}></View>
            <Text style={{
                fontFamily: 'Raleway-Light',
                textAlign: 'center',
                marginBottom: 4
            }}>
                Arraste para cima para atualizar a página!</Text>
            <View style={styles.horizontalDivider}></View>
            {
                this.state.services.map(e => {
                    return (
                        <ServiceCard
                            title={e.title}
                            author={e.author}
                            category={e.category}
                            description={e.description}
                            id={e.id}
                            key={e.id}
                            navigation={this.props.navigation}/>
                    )
                })
            }
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#fafafa'
    },
    createservicebutton: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    horizontalDivider: {
        marginVertical: 10,
        borderBottomColor: '#bababa',
        borderBottomWidth: 1,
        marginHorizontal: 15
    }
})

export default Services