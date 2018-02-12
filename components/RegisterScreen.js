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
 } from 'react-native';
import firebaseApp from '../firebase';

export class RegisterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
        title: "Register",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue"
    });


  constructor(props) {
    super(props);
    this.state = {
      email: "", 
      password: "", 
      username: "",
      registerClicked: false,
      registerFailed: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email} 
          placeholder="Email" />
        <TextInput
          style={styles.textinput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} 
          placeholder="Password" />

        <TextInput
          style={styles.textinput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username} 
          placeholder="Username" />

        <Button
            title="Register"
            onPress={this.register.bind(this)}
        ></Button>
        { this.state.registerClicked && <ActivityIndicator size="large" style={{marginTop: 10}} color="#00ff00"/>}
        { this.state.registerFailed && <Text style={{color: "#ff0000"}}>Registration Failed</Text>}
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
      console.log("REGISTER PRESSED");
      this.setState({registerClicked: true, registerFailed: false});
      var s = firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        currentUser = firebaseApp.auth().currentUser;
        firebaseApp.database().ref("Users/" + currentUser.uid).set({
          username: this.state.username,
          email: this.state.email,
          description: "asdf",
          profile_picture: "profile picture",
        });

        this.setState({registerClicked: false});
        this.props.navigation.navigate("Main", {navigation: this.props.navigation});
      }).catch((error) => {
          console.log("REGISTRATION FAILED");
          this.setState({registerClicked: false});
          this.setState({registerFailed: true});
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    height: 58,
    fontSize: 18, 
    minWidth: '75%',
    maxWidth: '75%', 
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'gray', 
    borderWidth: 0
  },
});
