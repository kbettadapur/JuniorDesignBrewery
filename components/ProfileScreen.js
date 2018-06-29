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
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Footer, Container, Icon, Fab } from 'native-base';
import firebaseApp from '../firebase';
import { ImagePicker, LinearGradient } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { getUserData, setUserData } from '../lib/FirebaseHelpers';

console.disableYellowBox = true;

export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_mode: false,
            user: null,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg",
            imageBase64: null,            
        }
        this.old_vals = null;
    }

    componentDidMount() {
        uid = firebaseApp.auth().currentUser.uid;
        getUserData(uid).then((user) => {
            this.old_vals = Object.assign({}, user);
            this.setState({user: user});
        })
    }

    render() {
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
                        {this.state.user.avatar != null && 
                            <View>
                                    <Image source={{ uri:  'data:image/png;base64,' + this.state.user.avatar.join('')}} style={styles.image_style} />
                            </View>
                        }
                        <Text style={styles.title_style}>{this.state.user.username}</Text>
                            {this.state.user.age > 0 && <Text style={[styles.subtitle_style]}>
                            {this.state.user.age == -1 ? "" : this.state.user.age} Years Old
                        </Text>}
                        <Text style={[styles.subtitle_style]}>{(this.state.user.num_children == 0) ? "No Children" : 
                            this.state.user.num_children == 1 ? "1 Child" : this.state.user.num_children + " Children"}
                        </Text> 
                        <View style={{marginBottom: 10}}/>
                        </LinearGradient>
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                        <Text style={[styles.subtitle_style2]}>Bio</Text>
                        <Text style={styles.subtitle_style3}>{this.state.user.description}</Text>
                    </View>

                    <Fab
                        direction="up"
                        position="bottomRight"
                        style={{ backgroundColor: 'green'}}
                        onPress={() => this.setState({edit_mode: true})}
                    >
                        <Icon name="md-create" />
                    </Fab>
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
            <Container style={{backgroundColor: '#fff'}}>
            <ScrollView>
                <View style={{backgroundColor: '#fff', flex: 1}}>
                    <View style={{alignItems: 'center', marginTop: 30}}>
                        {this.state.user.avatar != null && <TouchableOpacity onPress={this.pickImage.bind(this)}>
                            <View>
                                <Image source={{ uri:  'data:image/png;base64,' + (typeof this.state.user.avatar == 'string' ? this.state.user.avatar : this.state.user.avatar.join(''))}} style={styles.image_style} />
                            </View>
                        </TouchableOpacity>}
                        
                        <Text style={styles.title_style}>{this.state.user.username}</Text>
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                        <Text style={[styles.subtitle_style, {marginTop: 10}]}>Bio:</Text>
                        <TextInput style={{paddingBottom: 10}}multiline={true} value={this.state.user.description} onChangeText={(description) => {this.state.user.description = description; this.setState({user: this.state.user})}}></TextInput>
                    </View>
                    <View style={{width: '100%', paddingLeft: 10, display: 'flex', flexDirection: 'row'}}>
                        <Text style={[styles.subtitle_style, {marginTop: 3, flex: 1}]}>Age: </Text>
                        <TextInput style={{flex: 1, paddingBottom: 5, paddingLeft: 5}} keyboardType='numeric' value={this.state.user.age == -1 ? "": this.state.user.age + ""} onChangeText={(age) => {this.state.user.age = age.replace(/[^0-9]/g, ''); this.setState({user: this.state.user})}}></TextInput>
                        <View style={{flex: 9}}></View>
                    </View>
                    <View style={{width: '100%', paddingLeft: 10, display: 'flex', flexDirection: 'row'}}>
                        <Text style={[styles.subtitle_style, {marginTop: 3, color:'black', flex: 5}]}>Number of kids: </Text>
                        <TextInput style={{flex: 1, paddingBottom: 5, paddingLeft: 5}} keyboardType='numeric' value={this.state.user.num_children + ""} onChangeText={(num_children) => {this.state.user.num_children = num_children.replace(/[^0-9]/g, ''); this.setState({user: this.state.user})}}></TextInput>
                        <View style={{flex: 9}}></View>
                    </View>              
                </View>
                </ScrollView>
                <Fab
                        direction="up"
                        position="bottomRight"
                        style={{ backgroundColor: 'green', bottom: 110}}
                        onPress={this.confirmEdits.bind(this)}>
                    <Icon name="md-checkmark" />
                </Fab>
                <Fab
                    direction="up"
                    position="bottomRight"
                    style={{ backgroundColor: 'red', bottom: 50}}
                    onPress={() => this.setState({user: Object.assign({}, this.old_vals), edit_mode: false})}>
                    <Icon name="md-close" />
                </Fab>
                <Footer style={styles.footer_style}>
                    {this.props.renderTabs()}
                </Footer>
            </Container>
        );
    }

    confirmEdits() {
        this.state.edit_mode = false;
        
        avatar = [];
        if (this.state.user.avatar.length > 1048576) {
            for (i = 0; i <= this.state.user.avatar.length / 1048576; i++) {
                if ((i + 1) * 1048576 > this.state.user.avatar.length) {
                    end = this.state.user.avatar.length;
                } else {
                    end = (i + 1) * 1048576;
                }
                avatar.push(this.state.user.avatar.substring(i * 1048576, end));
            }
        } else {
            avatar.push(this.state.user.avatar);
        }
        this.state.user.avatar = avatar;
        this.old_vals = Object.assign({}, this.state.user);
        setUserData(this.state.user).then(() => {
            this.setState({});
        })
    }

    lengthInUtf8Bytes(str) {
        // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
        var m = encodeURIComponent(str).match("/%[89ABab]/g");
        return str.length + (m ? m.length : 0);
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
            this.state.user.avatar = result.base64;
            this.state.image = result.uri;
            this.setState({});                
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
      color: 'rgba(0, 0, 0, 0.95)',
  },
  subtitle_style: {
      fontSize: 15,
      color: 'rgba(0, 0, 0, 0.95)',
  },
  subtitle_style2: {
    fontSize: 17,
    color: 'rgb(0, 0, 0)',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle_style3: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.7)',
  }
})