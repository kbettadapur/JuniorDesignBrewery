import React from 'react';
import Expo from 'expo';
import { StyleSheet, Button, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { BreweryApp } from './BreweryApp'
import { LoginScreen } from './components/LoginScreen';
import { MainScreen } from './components/MainScreen';

class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <BreweryApp/>
      </View>
    );
  }
}

const AppNavigator = StackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default AppNavigator;