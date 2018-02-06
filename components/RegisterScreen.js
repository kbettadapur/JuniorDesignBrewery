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
          style={{height: 40, width: 100,borderColor: 'gray', borderWidth: 0}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email} 
          placeholder="Email" />
        <TextInput
          style={{height: 40, width: 100,borderColor: 'gray', borderWidth: 0}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} 
          placeholder="password" />

        <TextInput
          style={{height: 40, width: 100,borderColor: 'gray', borderWidth: 0}}
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
});
