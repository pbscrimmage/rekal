//import App from './App';

import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

class Entry extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.entryDate}</Text>
                <Text>{this.props.entryTitle}</Text>
                <Text>{this.props.entryType}</Text>
                <Text style={styles.text}>{this.props.entryText}</Text>
            </View>
       );
    }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.entryText}>┍──────────────────────────────────────┑</Text>
        <Text style={styles.entryText}>│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│</Text>
        <Text style={styles.entryText}>│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│</Text>
           <View style={styles.btnContainer}>
              <Text style={styles.overlayText}>[+] Add Item</Text>
           </View>
        <Text style={styles.entryText}>│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│</Text>
        <Text style={styles.entryText}>┕──────────────────────────────────────┚</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#404040',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    entryTitle: {

    },
    entryDate: {

    },
    entryText: {
        fontFamily: "monospace",
        lineHeight: 16,
        includeFontPadding: false,
        textAlignVertical: "center",
        textAlign: "center",
        color: "#eee"
    },
    btnContainer: {
        position: "absolute",
        bottom: "5%",
        zIndex: 2
    },
    overlayText: {
        //backgroundColor: 'rgba(0,0,0,0)',
        fontFamily: "monospace",
        lineHeight: 16,
        includeFontPadding: false,
        textAlignVertical: "center",
        textAlign: "center",
        color: "#eee"
    }
});

AppRegistry.registerComponent('rekal_v2', () => App);

