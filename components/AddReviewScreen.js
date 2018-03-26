import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView } from 'react-native';
import { Footer, Container } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import Guid from 'guid';
import StarRating from 'react-native-star-rating';
import { NavigationActions } from 'react-navigation';


export class AddReviewScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Leave a review",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue"
    });

    constructor(props) {
        super(props);
        this.state = {
            brewery: this.props.navigation.state.params.brewery,
            review: this.props.navigation.state.params.review,
            hasChangingTables: null,
            hasFamilyRestroom: null,
            isWheelchairAccessible: null,
            seatingArrangements: 0,
            kidFriendly: 0,
            safety: 0,
            petFriendly: 0,
            foodOptionDiversity: 0,
            nonAlcoholicOptions: 0,
            soundLevel: 0,
            isSmokingPermitted: 0,
            strollerKids: 0,
            kThroughSix: 0,
            teenagers: 0,
            overallRating: 0,
            comments: null,
            revId: 0,
        }
        if(this.state.review != null) {
            this.state.hasChangingTables = this.state.review.hasChangingTables;
            this.state.hasFamilyRestroom = this.state.review.hasFamilyRestroom;
            this.state.isWheelchairAccessible = this.state.review.isWheelchairAccessible;
            this.state.seatingArrangements = this.state.review.seatingArrangements;
            this.state.kidFriendly = this.state.review.kidFriendly;
            this.state.safety = this.state.review.safety;
            this.state.petFriendly = this.state.review.petFriendly;
            this.state.foodOptionDiversity = this.state.review.foodOptionDiversity;
            this.state.nonAlcoholicOptions = this.state.review.nonAlcoholicOptions;
            this.state.soundLevel = this.state.review.soundLevel;
            this.state.isSmokingPermitted = this.state.review.isSmokingPermitted;
            this.state.strollerKids = this.state.review.strollerKids;
            this.state.kThroughSix = this.state.review.kThroughSix;
            this.state.teenagers = this.state.review.teenagers;
            this.state.overallRating = this.state.review.overallRating;
            this.state.comments = this.state.review.comments;
            this.state.revId = this.state.review.revId;
        }
    }

    render() {
        return (
            <ScrollView>
            <View>
                <Text style={styles.title}>{this.state.brewery.name}</Text>
                
                <Text style={styles.radio_title}>Enough Changing Tables?</Text>
                <RadioGroup
                    selectedIndex = {(this.state.hasChangingTables == 0) ? 1 : 0}
                    onSelect = {(index, value) => this.setState({hasChangingTables: value})}>
                    <RadioButton value={1} >
                    <Text>Yes</Text>
                    </RadioButton>
            
                    <RadioButton value={0}>
                    <Text>No</Text>
                    </RadioButton>
                </RadioGroup>

                <Text style={styles.radio_title}>Family Restroom Available?</Text>
                <RadioGroup
                    selectedIndex = {(this.state.hasFamilyRestroom == 0) ? 1 : 0}
                    onSelect = {(index, value) => this.setState({hasFamilyRestroom: value})}>
                    <RadioButton value={1} >
                    <Text>Yes</Text>
                    </RadioButton>
            
                    <RadioButton value={0}>
                    <Text>No</Text>
                    </RadioButton>
                </RadioGroup>

                <Text style={styles.radio_title}>Wheelchair Accessible?</Text>
                <RadioGroup
                    selectedIndex = {(this.state.isWheelchairAccessible == 0) ? 1 : 0}
                    onSelect = {(index, value) => this.setState({isWheelchairAccessible: value})}>
                    <RadioButton value={1} >
                    <Text>Yes</Text>
                    </RadioButton>
            
                    <RadioButton value={0}>
                    <Text>No</Text>
                    </RadioButton>
                </RadioGroup>
                <Text style={styles.radio_title}>Seating Arrangements?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.seatingArrangements}
                    selectedStar={(rating) => this.setState({seatingArrangements: rating})}
                    fullStarColor={'#eaaa00'}
                />

                <Text style={styles.radio_title}>Kid Friendly?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.kidFriendly}
                    selectedStar={(rating) => this.setState({kidFriendly: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <Text style={styles.radio_title}>Safety?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.safety}
                    selectedStar={(rating) => this.setState({safety: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <Text style={styles.radio_title}>Pet Friendly?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.petFriendly}
                    selectedStar={(rating) => this.setState({petFriendly: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <Text style={styles.radio_title}>Food Option Diversity?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.foodOptionDiversity}
                    selectedStar={(rating) => this.setState({foodOptionDiversity: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <Text style={styles.radio_title}>Non Alcoholic Options?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.nonAlcoholicOptions}
                    selectedStar={(rating) => this.setState({nonAlcoholicOptions: rating})}
                    fullStarColor={'#eaaa00'}
                />

                <Text style={styles.radio_title}>Sound Level?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.soundLevel}
                    selectedStar={(rating) => this.setState({soundLevel: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <Text style={styles.radio_title}>Smoking (1) restricted (5) prevalent</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.isSmokingPermitted}
                    selectedStar={(rating) => this.setState({isSmokingPermitted: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <Text style={styles.radio_title}>How good is it for stroller kids?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.strollerKids}
                    selectedStar={(rating) => this.setState({strollerKids: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <Text style={styles.radio_title}>How good is it for K-6 kids?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.kThroughSix}
                    selectedStar={(rating) => this.setState({kThroughSix: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <Text style={styles.radio_title}>How good is it for teenagers?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.teenagers}
                    selectedStar={(rating) => this.setState({teenagers: rating})}
                    fullStarColor={'#eaaa00'}
                />
                
                <TextInput
                    style={styles.textinput}
                    onChangeText={(comments) => this.setState({comments})}
                    value={this.state.comments}
                    placeholder="Comments?" />
                

                <Text style={styles.radio_final_title}>Overall Rating?</Text>
                <StarRating
                    maxStars={5}
                    rating={this.state.overallRating}
                    selectedStar={(rating) => this.setState({overallRating: rating})}
                    fullStarColor={'#eaaa00'}
                />
                <Button title="Submit" onPress={this.submitReview.bind(this)}></Button>
            </View>
            </ScrollView>
        )
    }

    submitReview() {
        console.log("Submitting Review");
        if(this.state.revId == 0)
            this.state.revId = this.newGuid();
        firebaseApp.database().ref("Users/" + firebaseApp.auth().currentUser.uid).on("value", (snapshot) => {
            firebaseApp.database().ref("Reviews/" + this.state.revId).set({
            userId: firebaseApp.auth().currentUser.uid,
            username: snapshot.val().username,
            brewery: this.state.brewery.placeId,
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
            overallRating: this.state.overallRating,
            comments: this.state.comments,
            revId: this.state.revId,
            }).then(() => {
                const backAction = NavigationActions.back({
                    key: null
                  }) 
                  this.props.navigation.dispatch(backAction);                
            });
        });
        /**/
    }

    newGuid() { // Public Domain/MIT
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
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
  radio_title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  radio_final_title: {
      fontSize: 16,
      fontWeight: 'bold'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
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