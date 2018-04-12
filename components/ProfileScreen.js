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
import { StyleSheet, View, Text, Image, TouchableHighlight, TextInput } from 'react-native';
import { Footer, Container, Icon } from 'native-base';
import firebaseApp from '../firebase';
import { ImagePicker, LinearGradient } from 'expo';
import FAB from 'react-native-fab';
import Spinner from 'react-native-loading-spinner-overlay';

console.disableYellowBox = true;

export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_mode: false,
            user: null,
            old_vals: null,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg",
            imageBase64: null,
            
        }
        id = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref("/Users/" + id).on('value', (snapshot) => {
            this.state.user = snapshot.val();
            this.state.old_vals = Object.assign({}, this.state.user);
            this.setState({});
        });
    }

    render() {

        // if (this.state.user == null) {
        //     return (
        //         <Container>
        //         <View style={{flex: 1}}>
        //             <Text>Profile Screen</Text>
        //         </View>
        //         <Footer style={{width: '100%'}}>
        //             {this.props.renderTabs()}
        //         </Footer>
        //         </Container>
        //     );
         if (!this.state.edit_mode) {
            return (
                <Container style={{width: '100%'}}>
                    {this.renderContent()}
                </Container>
            )
        } else {
            return (
                <Container style={{width: '100%'}}>
                    {this.renderEditContent()}
                </Container>
            )
        }
    }

    renderContent() {
        return (
            <Container>
                <Spinner overlayColor={"rgba(0, 0, 0, 0.3)"} 
                color={"rgb(66,137,244)"}
                visible={(this.state.user == null)} 
                textStyle={{color: '#000000'}} />
                {this.state.user != null && <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={{alignItems: 'center'}}>
                        <LinearGradient colors={['#0066cc', '#2196F3']} style={{width:'100%', alignItems:'center'}}>
                        <TouchableHighlight>
                            <View>
                                    <Image source={{ uri:  'data:image/png;base64,' + this.state.user.profile_picture}} style={styles.image_style} />
                            </View>
                        </TouchableHighlight>
                        <Text style={styles.title_style}>{this.state.user.username}</Text>
                        {this.state.user.age > 0 && <Text style={[styles.subtitle_style]}>{this.state.user.age == -1 ? "" : this.state.user.age} Years Old</Text>}
                        <Text style={[styles.subtitle_style]}>Number of kids: {this.state.user.num_children}</Text>
                        <View style={{marginBottom: 10}}/>
                        </LinearGradient>
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                        <Text style={[styles.subtitle_style2]}>Bio</Text>
                        <Text style={styles.subtitle_style3}>{this.state.user.description}</Text>
                    </View>

                    <FAB 
                        buttonColor="green"
                        iconTextColor="#FFFFFF"
                        onClickAction={() => this.setState({edit_mode: true})}
                        visible={true}
                        iconTextComponent={<Icon name="md-create"/>} />
                </View> }
                {this.state.user == null && <View style={{flex:1}}/>}
                <Footer style={styles.footer_style}>
                    {this.props.renderTabs()}
                </Footer>
            </Container>
        );
    }

    renderEditContent() {
        return (
            <Container>
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={{alignItems: 'center', marginTop: 30}}>
                        <TouchableHighlight onPress={this.pickImage.bind(this)}>
                            <View>
                                    <Image source={{ uri:  'data:image/png;base64,' + this.state.user.profile_picture}} style={styles.image_style} />
                            </View>
                        </TouchableHighlight>
                        
                        <Text style={styles.title_style}>{this.state.user.username}</Text>
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                        <Text style={[styles.subtitle_style, {marginTop: 10}]}>Bio</Text>
                        <TextInput value={this.state.user.description} onChangeText={(description) => {this.state.user.description = description; this.setState({user: this.state.user})}}></TextInput>
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                        <Text style={[styles.subtitle_style, {marginTop: 10}]}>Age: </Text>
                        <TextInput keyboardType='numeric' value={this.state.user.age + ""} onChangeText={(age) => {this.state.user.age = age; this.setState({user: this.state.user})}}></TextInput>
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                        <Text style={[styles.subtitle_style, {marginTop: 10, color:'black'}]}>Number of kids: </Text>
                        <TextInput keyboardType='numeric' value={this.state.user.num_children + ""} onChangeText={(num_children) => {this.state.user.num_children = num_children; this.setState({user: this.state.user})}}></TextInput>
                    </View>
                    <Container style={{marginBottom: 50}}>
                    <FAB 
                        buttonColor="green"
                        iconTextColor="#FFFFFF"
                        onClickAction={this.confirmEdits.bind(this)}
                        visible={true}
                        iconTextComponent={<Icon name="md-checkmark"/>} />
                    </Container>
                    <Container>
                    <FAB 
                        buttonColor="red"
                        iconTextColor="#FFFFFF"
                        onClickAction={() => this.setState({user: Object.assign({}, this.state.old_vals), edit_mode: false})}
                        visible={true}
                        iconTextComponent={<Icon name="md-close"/>} />
                    </Container>



                </View>

                <Footer style={styles.footer_style}>
                    {this.props.renderTabs()}
                </Footer>
            </Container>
        );
    }

    confirmEdits() {
        this.state.edit_mode = false;
        this.state.old_vals = Object.assign({}, this.state.user);
        firebaseApp.database().ref("Users/" + firebaseApp.auth().currentUser.uid).set(this.state.user);
        this.setState({});
    }

    async pickImage() {
        result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [1, 1]
        })
        this.handleImage(result);
    }

    handleImage(result) {
        if (!result.cancelled) {
            firebaseApp.database().ref("Users/" + firebaseApp.auth().currentUser.uid).set({
                userId: firebaseApp.auth().currentUser.uid,
                username: this.state.user.username,
                description: this.state.user.description,
                email: this.state.user.email,
                profile_picture: result.base64
            }).then(() => {
                this.state.user.profile_picture = result.base64;
                this.state.image = result.uri;
                this.setState({});                
            }).catch((err) => {
                console.log(err);
            });
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
    borderRadius: 100,
    width: 150,
    height: 150,
    marginTop: 20,
  },
  footer_style: {
      width: '100%'
  },
  title_style: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 0.95)',
  },
  subtitle_style: {
      fontSize: 15,
      color: 'rgba(255, 255, 255, 0.95)',
  },
  subtitle_style2: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle_style3: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.7)',
  }
})