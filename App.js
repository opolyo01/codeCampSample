import React, { Component } from 'react';
import { TouchableOpacity, View, Dimensions,
         Text, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

let styles = {};

const key = 'record';

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      user: '',
      record: {},
    };
    this.updateUser= this.updateUser.bind(this);
    this.submitUpdateUser = this.submitUpdateUser.bind(this);
  }

  updateUser = (user) => {
    this.setState({ user });
  }

  submitUpdateUser = () => {
    const {record, user} = this.state;
    if (record[user]) {
      record[user] = record[user] + 1;
    } else  {
      record[user] = 1;
    }
    
    AsyncStorage.setItem(key, JSON.stringify(record))
      .then(() => this.setState({record}))
      .catch((err) => console.log('err: ', err))
  }

  componentDidMount () {
    AsyncStorage.getItem(key)
      .then((res) => this.setState({ record: JSON.parse(res||{}) }))
      .catch((err) => console.log('err: ', err))
  }

  render () {
    const {record} = this.state;
    const records = Object.keys(record);
    const recordView = records.map((user) => {
      return (
        <Text key={user}>{user}  {record[user]} time champion</Text>
      )
    });
    let data = [];
    let labels = [];
    records.forEach((user) => {
      if (user) {
        labels.push(user);
        data.push(record[user]);
      }
    });
    const barChartData = {
      labels,
      datasets: [
        {
          data
        }
      ]
    };
    const chartConfig = {
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage:1
    };
    return (
      <View style={styles.container}>
        <View>
          <Text style={{textAlign: 'center'}}>Who is the best player?</Text>
          <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
              <Picker.Item label = "Ronaldo" value = "ronaldo" />
              <Picker.Item label = "Maria" value = "maria" />
              <Picker.Item label = "Messi" value = "messi" />
              <Picker.Item label = "Edward" value = "edward" />
          </Picker>
          <TouchableOpacity onPress={this.submitUpdateUser}
                            style={styles.button}>
            <Text>Submit The Best Soccer Player</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{textAlign: 'center'}}>Stats</Text>
          {recordView}
        </View>
        <BarChart data={barChartData} width={screenWidth} height={220} chartConfig={chartConfig} />
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
    borderRadius: 12,
    backgroundColor: '#dddddd'
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
   }
});