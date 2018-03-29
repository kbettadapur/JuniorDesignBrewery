/*
* Registration Screen from the Family Friendly Brewery Tracker
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
  StyleSheet, 
  Button, 
  Text, 
  TextInput, 
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
 } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebaseApp from '../firebase';

export class RegisterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
        title: "Register",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "white"
    });


  constructor(props) {
    super(props);
    this.state = {
      email: "", 
      password: "", 
      username: "",
      registerClicked: false,
      registerFailed: false,
      errorMessage: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{textAlign:'left', color:'gray'}}>You'll use your email and password to login in</Text>
        <Text style={{textAlign:'left', color:'gray'}}>Your username will appear alongside your reviews</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email} 
            placeholder="Email" />
          <TextInput
            style={styles.textinput}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true} 
            placeholder="Password" />

          <TextInput
            style={styles.textinput}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username} 
            placeholder="Username" />

          { this.state.registerClicked && <ActivityIndicator size="large" style={{marginTop: 10}} color="#00ff00"/>}
          { this.state.registerFailed && <Text style={{color: "#ff0000"}}>{this.state.errorMessage}</Text>}
          <TouchableOpacity 
            style={{ height: 40, width:200, marginTop: 10, backgroundColor:"#2196F3", borderRadius:3, alignItems:'center', justifyContent:'center' }}
            onPress={this.register.bind(this)}>
            <Text style={{color:"#FFF", fontSize:16, fontWeight:'bold'}}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }

  renderLoadingDialog(){
        return (
            <LoadingDialog
                dialogProps={{
                    isOpen: this.requestId != null && this.requestStore.getRequestStatus(this.requestId) === RequestStatus.Pending,
                    title: "Creating...",
                    animationType: "fade"
                }}
                subtitle="Creating client..."

            />
        );
    }

  register() {
      this.setState({registerClicked: true, registerFailed: false});
      var s = firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        currentUser = firebaseApp.auth().currentUser;
        firebaseApp.database().ref("Users/" + currentUser.uid).set({
          username: this.state.username.trim(),
          email: this.state.email.trim(),
          description: "asdf",
          profile_picture: "profile picture",
        });

        this.setState({registerClicked: false});
        this.props.navigation.navigate("Main", {navigation: this.props.navigation});
      }).catch((error) => {
          console.log("REGISTRATION FAILED");
          console.log(error)
          this.setState({registerClicked: false});
          this.setState({registerFailed: true});
          this.setState({errorMessage: error.message})
      });
  }
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%'
  },
  textinput: {
    height: 58,
    fontSize: 18, 
    minWidth: '80%',
    maxWidth: '80%', 
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'gray', 
    borderWidth: 0
  },
  button: {
    width:'100%',
    marginVertical: 10,
    height: 20,
  },
});
