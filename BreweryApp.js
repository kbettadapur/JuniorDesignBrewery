/*
* Root Screen from the Family Friendly Brewery Tracker
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 3 as
* published by the Free Software Foundation;
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
* OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS.
* IN NO EVENT SHALL THE COPYRIGHT HOLDER(S) AND AUTHOR(S) BE LIABLE FOR ANY
* CLAIM, OR ANY SPECIAL INDIRECT OR CONSEQUENTIAL DAMAGES, OR ANY DAMAGES
* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*
* ALL LIABILITY, INCLUDING LIABILITY FOR INFRINGEMENT OF ANY PATENTS,
* COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS, RELATING TO USE OF THIS
* SOFTWARE IS DISCLAIMED.
*/

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