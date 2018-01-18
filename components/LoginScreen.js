import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

export class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
        title: "Login",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue"
    });


  constructor(props) {
    super();
    this.state = {username: "USERNAME"};
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
        <Button title="main" onPress={() => this.props.navigation.navigate("Main")}></Button>
      </View>
    );
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
