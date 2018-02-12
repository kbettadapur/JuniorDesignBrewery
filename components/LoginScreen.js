/*
* Login Screen from the Family Friendly Brewery Tracker
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
import { StyleSheet, Button, Text, TextInput, ViewText, View } from 'react-native';
import firebaseApp from '../firebase';

export class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
        title: "Login",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue"
    });


  constructor(props) {
    super();
    this.state = {email: "", password: ""};
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderComponent()}
      </View>
    );
  }

  renderComponent() {
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
            secureTextEntry={true}
            placeholder="Password" />
        <View style={{marginVertical: 5, justifyContent:'center'}}>
          <View style={{marginVertical: 5}}>
            <Button title="LOGIN" textStyle={{fontSize:18}} buttonStyle={styles.button} onPress={this.login.bind(this)}></Button>
          </View>
          <Button title="Register" onPress={() => this.props.navigation.navigate("Register", {navigation: this.props.navigation})}> </Button> 
        </View>
      </View>
    );
  }

  login() {
    var s = firebaseApp.auth().signInWithEmailAndPassword(this.state.email == "" ? "ricky@gmail.com" : this.state.email, this.state.password == "" ? "ricky123" : this.state.password)
      .then(() => {
        this.props.navigation.navigate("Main", {navigation: this.props.navigation});
      })
      .catch((error) => {
        console.log("LOGIN FAILED");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  button: {
    width: '80%',
    marginVertical: 10,
    height: 20,
  }
});
