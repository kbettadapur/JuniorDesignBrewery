import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';
import { Footer, Container } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';


export class BreweryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brewery: this.props.navigation.state.params.brewery,
        }
        console.log(this.state.brewery);
    }

    render() {
        return (
            <View>
                <Text style={styles.title}>{this.state.brewery.name}</Text>
                

                <Button title="Add Review" onPress={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: this.state.brewery})}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});