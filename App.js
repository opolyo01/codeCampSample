import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, View, 
         Text, StyleSheet } from 'react-native';
let styles = {};

const bestPlayers = [{
  name: 'Maria Polyakov',
  age: '13 years',
  position: 'Center Midfielder'
},{
  name: 'Edward Polyakov',
  age: '10 years',
  position: 'Forward'
}]

const key = 'player';

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      bestPlayer: {}
    };
    this.getPlayer= this.getPlayer.bind(this);
  }
  componentDidMount () {
    const bestPlayerIdx = Math.ceil(Math.random() * bestPlayers.length);
    const bestPlayer = bestPlayers[bestPlayerIdx - 1];
    AsyncStorage.setItem(key, JSON.stringify(bestPlayer))
      .then(() => console.log('item stored...'))
      .catch((err) => console.log('err: ', err))
  }
  getPlayer () {
    AsyncStorage.getItem(key)
      .then((res) => this.setState({ bestPlayer: JSON.parse(res) }))
      .catch((err) => console.log('err: ', err))
  }
  render () {
    const { bestPlayer } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Who is the best player?</Text>
        <TouchableOpacity onPress={this.getPlayer} 
                            style={styles.button}>
          <Text>Get Best Soccer Player</Text>
        </TouchableOpacity>
        <Text>{bestPlayer.name}</Text>
        <Text>{bestPlayer.age}</Text>
        <Text>{bestPlayer.position}</Text>
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    margin: 20
  },
  button: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    height: 55,
    backgroundColor: '#dddddd'
  }
});