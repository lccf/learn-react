import React, { Component } from 'react';
import {
  StyleSheet,
  Text, TextStyle,
  View, ViewStyle
} from 'react-native';

import { Hello } from './components/index';

interface Props {}

interface State {}

export default class App extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Hello style={ styles.instructions } text="To get started, edit src/index.ios.tsx" />
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  } as ViewStyle,
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  } as TextStyle,
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  } as TextStyle,
});