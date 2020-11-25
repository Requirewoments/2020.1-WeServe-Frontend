import React, { Component } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

import HomePageButton from '../components/HomePageButton'

export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.mainstyling}>
        <Text style={styles.title}>O que você precisa hoje?</Text>
        <HomePageButton
          title="Serviços"
          onPress={() => this.props.navigation.navigate('ServicesIndex')}
        />
        <HomePageButton
          title="Prestar serviço"
          onPress={() => this.props.navigation.navigate('ServiceSubmit')}
        />
        <HomePageButton
          title="Ver mensagens"
          onPress={() => this.props.navigation.navigate('MessagesIndex')}
        />
        <HomePageButton
          title="Seu perfil"
          onPress={() => this.props.navigation.navigate('ProfileUser')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontFamily: 'Raleway-Normal',
    alignSelf: 'center',
    fontSize: 25,
  },
  button: {

  }
});
