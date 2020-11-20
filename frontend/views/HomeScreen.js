import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

class HomeScreen extends Component {
  
  constructor (props) {
    super(props)
  }

  render () {
    return (
    <>
      <View style={styles.container}>
        <Text style={styles.text1}> Tela principal </Text>
        <Text style={styles.text2}> Renato esteve aqui </Text>
      </View>
    </>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "column",
        backgroundColor: '#696969',
    },
    text1: {
        fontSize: 25,
        color: 'white'
    },
    text2: {
        color: '#dadada'
    }
});

export default HomeScreen
