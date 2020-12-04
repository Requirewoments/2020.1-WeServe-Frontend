import React, { Component, useContext, useState } from 'react'
import {
    StyleSheet,
    ScrollView, View,
    RefreshControl,
    Text
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

import UserContext from '../context/UserContext'

import ServiceCard from '../components/ServiceCard'
import HomePageActionButton from '../components/HomePageActionButton'
import Globals from '../context/Globals'

class Services extends Component {
    url_request = Globals.server_ip + '/service/'

    constructor(props) {
        super(props)

        this.state = {
            allServices: [],
            refreshing: false,
            services: [],
            typeService: 'Tudo',
        }

        this.props.navigation.addListener('focus', e => {
            this.fetchServices()
        });
    }

    componentDidMount() {
        this.fetchServices()
    }

    selectServices() {
        const dateFilter = (this.state.typeService === 'Tudo' ?
            ['Oferta', 'Procura'] :
            [this.state.typeService, 'null']
        );
        const services = this.state.allServices.filter(
            service => (
                service.category === dateFilter[0] || service.category === dateFilter[1]
            ))
        this.setState({ services: services })
    }

    async fetchServices() {
        let services = []
        await fetch(this.url_request)
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

        this.setState({ allServices: services })
        this.selectServices()
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
                        }} />
                }>
                <View style={styles.createservicebutton}>
                    <HomePageActionButton
                        title="Oferecer/Solicitar serviço"
                        onPress={() => this.props.navigation.navigate('ServiceSubmit')} />
                </View>
                <View style={styles.horizontalDivider}></View>
                <Text style={{
                    fontFamily: 'Raleway-Light',
                    textAlign: 'center',
                    marginBottom: 4
                }}>
                    Arraste para cima para atualizar a página!</Text>
                <View style={styles.horizontalDivider}></View>
                <View
                    style={styles.categorypicker}>
                    <Picker
                        selectedValue={this.state.typeService}
                        onValueChange={async (itemValue) => {
                            await this.setState({ typeService: itemValue })
                            this.selectServices()
                        }
                    }>
                        <Picker.Item label="Tudo" value="Tudo" />
                        <Picker.Item label="Oferta" value="Oferta" />
                        <Picker.Item label="Procura" value="Procura" />
                    </Picker>
                </View>
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
                            onPress={() => this.props.navigation.navigate("ServiceView", { id: e.id })} />
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
        paddingHorizontal: 20
    },
    horizontalDivider: {
        marginVertical: 10,
        borderBottomColor: '#bababa',
        borderBottomWidth: 1,
        marginHorizontal: 15
    },
    categorypicker: {
        borderWidth: 0.2,
        borderColor: 'black',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 20
    }
})

export default (props) => {
    const { state, dispatch } = useContext(UserContext)
    const [name, setName] = useState(state.user.name)
    const [username, setUsername] = useState(state.user.username)
    const [email, setEmail] = useState(state.user.email)

    context = {
        name: name,
        email: email,
        username: username
    }

    return (
        <Services userContext={context} {...props} />
    )
}