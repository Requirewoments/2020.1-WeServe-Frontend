import React, { Component } from 'react'
import { StyleSheet, ScrollView, TextInput, Text, View } from 'react-native'
import HomePageActionButton from '../components/HomePageActionButton'
import { Picker } from '@react-native-picker/picker'

class AutoExpandingTextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            height: 0
        };
    }

    render() {
        return (
            <TextInput
                {...this.props}
                multiline={true}
                onChangeText={(text) => {
                    this.setState({ text })
                    text = text
                }}
                onContentSizeChange={(event) => {
                    this.setState({ height: event.nativeEvent.contentSize.height })
                }}
                style={[styles.longtextinput, { height: Math.max(70, this.state.height) }]}
                value={this.state.text}
            />
        );
    }
}

class Services extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            category: 'Oferta',
            author: '',
            description: '',
            error_message:  '',
        }
    }

    async fetchWithTimeout(resource, options) {
        const { timeout = 5000 } = options;

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);

        return response;
    }

    handleCreate(res) {
        this.props.navigation.navigate('ServicesIndex')
    }

    async createService() {
        let service = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            category: this.state.category        
        }
        let invalidList = []
        for (let el in service) {
            if (service[el] === ''
                || service[el] === null
                || service === undefined) {
                invalidList.push(el)
            }
        }
        if (invalidList.length > 0) {
            this.setState({
                error_message: 'Os seguintes campos não podem estar vazios: ' + invalidList.join(', '),
            })
            return
        }

        let headers = new Headers()
        headers.append("Content-Type", "application/json")

        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(service),
            redirect: 'follow'
        }

        let success = false
        let resultData = null
        await this.fetchWithTimeout("http://192.168.0.4:3003/service/", requestOptions)
            .then(response => response.text())
            .then(result => {
                success = true
                resultData = result
            })
            .catch(error => console.log('REQUEST ERROR:', error))
        if (success) {
            this.handleCreate(resultData)
        }
    }

    render() {
        return (
            <ScrollView style={styles.inputcontainer}>
                <View>
                    <Text
                        style={{
                            color: '#d88',
                            height: 33
                        }}>
                        {this.state.error_message}
                    </Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Nome do serviço'
                        value={this.state.title}
                        onChangeText={text => this.setState({ title: text })} />
                    <Text style={styles.descriptiontext}>
                        Categoria do serviço
                    </Text>
                    <View
                        style={styles.categorypicker}>
                        <Picker
                            selectedValue={this.state.category}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ category: itemValue })
                            }>
                            <Picker.Item label="Oferta" value="Oferta" />
                            <Picker.Item label="Procura" value="Procura" />
                        </Picker>
                    </View>
                    <Text style={styles.descriptiontext}>
                        Descreva o serviço de forma precisa e breve!
                    </Text>
                    <AutoExpandingTextInput
                        placeholder='Descrição'
                        onChange={(obj) => {
                            this.setState({ description: obj.nativeEvent.text })
                        }} />
                    <TextInput
                        style={styles.textinput}
                        placeholder='Autor do serviço'
                        onChangeText={text => this.setState({ author: text })}/>
                    <View style={{ height: 10 }}></View>
                    <HomePageActionButton
                        title="Criar!"
                        onPress={() => this.createService()}
                        style={styles.createbutton} />
                    <View style={{ height: 20 }}></View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    inputcontainer: {
        backgroundColor: '#fafafa',
        paddingHorizontal: '7%',
        minHeight: '100%',
        paddingTop: 5
    },
    textinput: {
        padding: 10,
        borderWidth: 0.2,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    longtextinput: {
        padding: 10,
        borderWidth: 0.2,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        textAlignVertical: 'top'
    },
    createbutton: {
        marginBottom: 10,
    },
    categorypicker: {
        borderWidth: 0.2,
        borderColor: 'black',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    descriptiontext: {
        marginTop: 25,
        marginHorizontal: 3,
        fontSize: 12,
        textAlign: 'center'
    }
})

export default Services