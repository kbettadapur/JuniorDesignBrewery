import React from 'react';
import Expo from 'expo';
import { StyleSheet, Button, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { BreweryApp } from './BreweryApp'
import { LoginScreen } from './components/LoginScreen';
import { MainScreen } from './components/MainScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { BreweryScreen } from './components/BreweryScreen';
import { AddReviewScreen } from './components/AddReviewScreen';

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
    Main: { screen: MainScreen },
    Register: { screen: RegisterScreen },
    Brewery: { screen: BreweryScreen },
    AddReview: { screen: AddReviewScreen },
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