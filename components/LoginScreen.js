import React from 'react';
import { StyleSheet, Button, Text, TextInput, View, Image } from 'react-native';
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
          style={{height: 40, width: 100,borderColor: 'gray', borderWidth: 0}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder="Email" />

        <TextInput
          style={{height: 40, width: 100, marginTop: 10,borderColor: 'gray', borderWidth: 0}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholder="Password" />
        <Button title="Login" onPress={this.login.bind(this)}></Button>
        <Button title="Register" onPress={() => this.props.navigation.navigate("Register", {navigation: this.props.navigation})}></Button>
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
      //this.props.navigation.navigate("Main", {navigation: this.props.navigation});
    
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
