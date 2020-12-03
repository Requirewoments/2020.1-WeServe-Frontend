import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'

import Globals from '../context/Globals'

import ServiceCard from '../components/ServiceCard'
import UserContext from '../context/UserContext'

class NeedIndex extends Component {
    static contextType = UserContext
    constructor(props) {
        super(props)

        this.state = {
            needs: []
        }

        //this.props.navigation.addListener('focus', e => {
            //    this.fetchNeeds()
            //});r
        }
        
    componentDidMount() {
        console.log(this.context)
        this.fetchNeeds()
    }

    fetchNeeds() {
        const email = 'gabrielle@email.com'
        const url_requets = Globals.server_ip + '/work-need'
        const requestInfoDia = {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
        };

        fetch(url_requets, requestInfoDia).then((e) =>{
            return e.json()
        }).then((data) => {
            this.updateNeeds(data)
        }).catch((e) => {
            console.warn(e.status)
        })
    }

    updateNeeds(data) {
        this.setState({needs: data});
        console.warn(this.state.needs[0].user)
    }

    render() {
        return (
        <ScrollView style={styles.container}>
            <View style={styles.horizontalDivider}></View>
            {
                this.state.needs.map(e => {
                    return (
                        <ServiceCard
                            title={e.description}
                            authorname={e.user}
                            service={e.offeredServices}
                            id={e._id}
                            key={e._id}/>
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
        backgroundColor: '#fafafa',
        marginHorizontal: 10,
    },
    createneedbutton: {
        paddingVertical: 10,
    },
    horizontalDivider: {
        marginVertical: 10,
        borderBottomColor: '#bababa',
        borderBottomWidth: 1,
        marginHorizontal: 15
    },
    description: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default NeedIndex