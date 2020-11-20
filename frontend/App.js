import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

import HomeScreen from './views/HomeScreen'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      page: 'HomeScreen'
    }
  }

  changePage (page) {
    this.setState({page: page})
  }

  render () {
    if (this.state.page === 'HomeScreen') {
      return (<HomeScreen changePage={(e) => this.changePage(e)}/>)
    }
  }
};

const styles = StyleSheet.create({

});

export default App;

