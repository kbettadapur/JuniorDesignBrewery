import React from 'react';
import {
    View,
    StatusBar,
    Text
} from 'react-native';
import { StyleProvider, Container } from "native-base";

import { StackNavigator } from 'react-navigation';

import { LoginScreen } from './components/LoginScreen';
import { MainScreen } from './components/MainScreen';



export class BreweryApp extends React.Component {

    render() {
        return(
            <View>
            {this.renderComponent()}
            </View>
        )
    }


    renderComponent(){
        return (
            <StyleProvider>
                <Container>
                    <View style={{ flex: 0, height: StatusBar.currentHeight, backgroundColor: "#2196F3" }}>
                        <StatusBar barStyle="default" translucent={false} />
                    </View>
                    <Container>
                        <AppNavigator />
                    </Container>
                </Container>
            </StyleProvider>
        );
    }
}