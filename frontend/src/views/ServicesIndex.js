import React, { Component, useContext, useState } from 'react'
import { 
    StyleSheet,
    ScrollView,View,
    RefreshControl,
    Text
} from 'react-native'

import UserContext from '../context/UserContext'

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
        
        console.log(this.props)
    }
    
    componentDidMount() {
        this.fetchServices()
    }

    async fetchServices() {
        let services = []
        
        await fetch("https://requisitos-weserve.herokuapp.com/service/")
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
        paddingHorizontal: 20
    },
    horizontalDivider: {
        marginVertical: 10,
        borderBottomColor: '#bababa',
        borderBottomWidth: 1,
        marginHorizontal: 15
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
        <Services userContext={context} {...props}/>
    )
}