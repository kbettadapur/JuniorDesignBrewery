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
    }

    render() {
        return (
            <View>
                <Text>{this.state.brewery.name}</Text>

                <Button title="Add Review" onPress={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: this.state.brewery})}></Button>
            </View>
        )
    }
}