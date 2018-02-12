import React from 'react';
import { MapView, Constants, Location, Permissions } from 'expo';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';
import { Footer, Container } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';


export class BreweryScreen extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <Text>Brewery Page</Text>
            </View>
        )
    }
}