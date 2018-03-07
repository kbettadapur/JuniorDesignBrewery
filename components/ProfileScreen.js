/*
* Profile Screen from the Family Friendly Brewery Tracker
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
import { StyleSheet, View, Text } from 'react-native';
import { Footer, Container } from 'native-base';
import firebaseApp from '../firebase';
console.disableYellowBox = true;

export class ProfileScreen extends React.Component {
    user;

    constructor() {
        super();
        this.state = {user: null}
        id = firebaseApp.auth().currentUser.uid;
        console.log("ID: " + id);
        firebaseApp.database().ref("/Users/" + id).once('value').then((snapshot) => {
            this.setState({user: snapshot});
        });
    }

    render() {
        if (this.state.user == null) {
            return (
                <Container>
                <View style={{flex: 1}}>
                    <Text>Profile Screen</Text>
                </View>
                <Footer style={{width: '100%'}}>
                    {this.props.renderTabs()}
                </Footer>
                </Container>
            );
        } else {
            return (
                <Container>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={styles.image_style}><Text>[Image Here]</Text></View>
                        <Text style={{textAlign: 'center'}}>Username</Text>
                        <Text style={{textAlign: 'center'}}>Description</Text>
                    </View>
                    <Footer style={styles.footer_style}>
                        {this.props.renderTabs()}
                    </Footer>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image_style: {
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 100
  },
  footer_style: {
      width: '100%'
  }
})