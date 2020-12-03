import React, { Component } from 'react'
import { StyleSheet, ScrollView, TextInput, View } from 'react-native'

// components
import HomePageActionButton from '../components/HomePageActionButton'

// Url request 
import Globals from '../context/Globals'

class NeedSubmit extends Component {

    constructor (props){
        super(props)
        this.state = {
            description: 'n',
            offeredServices: 'n',
        }
    }

    postNeed(){
        const url_request = Globals.server_ip + '/work-need'
        const data = {
            description: this.state.description,
            offeredServices: this.state.offeredServices,
            user: 'neil@email.com',
            contacts: 'Algo'
        }

        const requestInfoDia = {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
            body: JSON.stringify(data),
        };

        fetch(url_request, requestInfoDia).then((e) =>{
            console.warn(e.status)
        }).catch((e) => {
            console.warn(e.status)
        })

        this.props.navigation.goBack()
    }

    render() {
        return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.servicetextinput}
                placeholder='Necessidade de serviço'
                onChangeText={(text) => this.setState({description: text})}
            /> 
            <TextInput
                style={styles.servicetextinput}
                placeholder='Serviço oferecido'
                onChangeText={(text) => this.setState({offeredServices: text})}
            />   
            <View style={styles.createservicebutton}>
                <HomePageActionButton
                    title="Adicionar necessidade"
                    onPress={() => this.postNeed()}
                    />
            </View>            
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#fafafa'
    },
    servicetextinput: {
        marginTop: 10,
        padding: 10
    },
    createservicebutton: {
        paddingVertical: 10,
    },
})

export default NeedSubmit