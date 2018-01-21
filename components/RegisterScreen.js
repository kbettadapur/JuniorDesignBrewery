import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';
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
    this.state = {email: "EMAIL", password: "PASSWORD", username: "USERNAME"};
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 100,borderColor: 'gray', borderWidth: 0}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email} />
        <TextInput
          style={{height: 40, width: 100,borderColor: 'gray', borderWidth: 0}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} />

        <TextInput
          style={{height: 40, width: 100,borderColor: 'gray', borderWidth: 0}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username} />

        <Button
            title="Register"
            onPress={this.register.bind(this)}
        ></Button>
      </View>
    );
  }

  register() {
      console.log("REGISTER PRESSED");
      var s = firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        currentUser = firebaseApp.auth().currentUser;
        firebaseApp.database().ref("Users/" + currentUser.uid).set({
          username: this.state.username,
          email: this.state.email,
          description: "asdf",
          profile_picture: "profile picture",
        })
        this.props.navigation.navigate("Main", {navigation: this.props.navigation});
      }).catch((error) => {
          console.log("REGISTRATION FAILED");
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
});
