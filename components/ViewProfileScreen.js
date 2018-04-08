/*
* External Screen from the Family Friendly Brewery Tracker
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
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { Footer, Container } from 'native-base';
import firebaseApp from '../firebase';
import { ImagePicker } from 'expo';
console.disableYellowBox = true;

export class ViewProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg",
            imageBase64: null,
        }
        id = this.props.navigation.state.params.id;
        console.log("ID: " + id);
        firebaseApp.database().ref("/Users/" + id).once('value').then((snapshot) => {
            this.setState({user: snapshot.val()});
        });
    }

    render() {
        if(this.state.user == null) {
            return (<Text>Profile Screen</Text>)
        } 
        return (
            <Container>
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={{alignItems: 'center', marginTop: 30}}>
                            <View>
                                    <Image source={{ uri:  'data:image/png;base64,' + this.state.user.profile_picture}} style={styles.image_style} />
                            </View>                        
                        <Text style={styles.title_style}>{this.state.user.username}</Text>
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                        <Text style={[styles.subtitle_style, {marginTop: 10}]}>Bio</Text>
                        <Text>{this.state.user.description}</Text>
                    </View>
                </View>
            </Container>
        );
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
    borderRadius: 100,
    width: 150,
    height: 150
  },
  footer_style: {
      width: '100%'
  },
  title_style: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 25
  },
  subtitle_style: {
      fontSize: 18,
      fontWeight: 'bold'
  }
})