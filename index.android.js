//import App from './App';

import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

class Entry extends Component {
    render() {
        return (
            <Text>{this.props.entryDate}</Text>
            <Text>{this.props.entryTitle}</Text>
            <Text>{this.props.entryType}</Text>
            <Text style={styles.text}>{this.props.entryText}</Text>
       );
    }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Open up yr butthole to start working on your app!</Text>
        <Text style={styles.text}>Changes you make will automatically reload.</Text>
        <Text style={styles.text}>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#404040',
        alignItems: 'center',
        justifyContent: 'center',
    },
    entryTitle: {

    },
    entryDate: {

    },
    entryText: {
        color: "#eee"
    }
});

AppRegistry.registerComponent('rekal_v2', () => App);

