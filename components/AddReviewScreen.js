import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView } from 'react-native';
import { Footer, Container } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';


export class AddReviewScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brewery: this.props.navigation.state.params.brewery,
            hasChangingTables: null,
            hasFamilyRestroom: null,
            isWheelchairAccessible: null,
            seatingArrangements: null,
            kidFriendly: null,
            safety: null,
            petFriendly: null,
            foodOptionDiversity: null,
            nonAlcoholicOptions: null,
            soundLevel: null,
            isSmokingPermitted: null,
            strollerKids: null,
            kThroughSix: null,
            teenagers: null,
            comments: null,
        }
    }

    render() {
        return (
            <ScrollView>
            <View>
                <Text>Add Review Screen</Text>
                <Text>{this.state.brewery.name}</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={(hasChangingTables) => this.setState({hasChangingTables})}
                    value={this.state.hasChangingTables}
                    placeholder="Changing Tables?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(hasFamilyRestroom) => this.setState({hasFamilyRestroom})}
                    value={this.state.hasFamilyRestroom}
                    placeholder="Family Restroom?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(isWheelchairAccessible) => this.setState({isWheelchairAccessible})}
                    value={this.state.isWheelchairAccessible}
                    placeholder="Wheelchair Accessible?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(seatingArrangements) => this.setState({seatingArrangements})}
                    value={this.state.seatingArrangements}
                    placeholder="Seating Arrangements?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(kidFriendly) => this.setState({kidFriendly})}
                    value={this.state.kidFriendly}
                    placeholder="Kid Friendly?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(safety) => this.setState({safety})}
                    value={this.state.safety}
                    placeholder="Safety?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(petFriendly) => this.setState({petFriendly})}
                    value={this.state.petFriendly}
                    placeholder="Pet Friendly?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(foodOptionDiversity) => this.setState({foodOptionDiversity})}
                    value={this.state.foodOptionDiversity}
                    placeholder="Food Option Diversity?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(nonAlcoholicOptions) => this.setState({nonAlcoholicOptions})}
                    value={this.state.nonAlcoholicOptions}
                    placeholder="Non Alcoholic Options?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(soundLevel) => this.setState({soundLevel})}
                    value={this.state.soundLevel}
                    placeholder="Sound Level?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(isSmokingPermitted) => this.setState({isSmokingPermitted})}
                    value={this.state.isSmokingPermitted}
                    placeholder="Smoking Permitted?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(strollerKids) => this.setState({strollerKids})}
                    value={this.state.strollerKids}
                    placeholder="Stroller Kids?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(kThroughSix) => this.setState({kThroughSix})}
                    value={this.state.kThroughSix}
                    placeholder="K Through Six?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(teenagers) => this.setState({teenagers})}
                    value={this.state.teenagers}
                    placeholder="Teenagers?" />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(comments) => this.setState({comments})}
                    value={this.state.comments}
                    placeholder="Comments?" />

                <Button title="Submit" onPress={this.submitReview.bind(this)}></Button>
            </View>
            </ScrollView>
        )
    }

    submitReview() {
        console.log("Submitting Review");
        firebaseApp.database().ref("Reviews").set({
          username: firebaseApp.auth().currentUser.uid,
          brewery: this.state.brewery.hashCode(),
          hasChangingTables: this.state.hasChangingTables,
          hasFamilyRestroom: this.state.hasFamilyRestroom,
          isWheelchairAccessible: this.state.isWheelchairAccessible,
          seatingArrangements: this.state.seatingArrangements,
          kidFriendly: this.state.kidFriendly,
          safety: this.state.safety,
          petFriendly: this.state.petFriendly,
          foodOptionDiversity: this.state.foodOptionDiversity,
          nonAlcoholicOptions: this.state.nonAlcoholicOptions,
          soundLevel: this.state.soundLevel,
          isSmokingPermitted: this.state.isSmokingPermitted,
          strollerKids: this.state.strollerKids,
          kThroughSix: this.state.kThroughSix,
          teenagers: this.state.teenagers,
          comments: this.state.comments,
        }).then(() => console.log("DONE"));
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