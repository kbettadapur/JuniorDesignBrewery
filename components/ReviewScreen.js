import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView } from 'react-native';
import { Footer, Container, Icon, List, ListItem } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';
import FAB from 'react-native-fab';
import StarRating from 'react-native-star-rating';
import Review from '../models/Review';

export class ReviewScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Review",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue"
    });

    constructor(props) {
        super(props);
        this.state = {
            review: this.props.navigation.state.params.review,
        }
        console.log(this.state.review.userId)
        console.log(firebaseApp.auth().currentUser.uid)
    }

    render() {
        return (
            <View style={{height: '100%'}}>
            <ScrollView style={{backgroundColor: '#fff'}}>
            <Image
                    style={{width: '100%', height: 200}}
                    source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&key=AIzaSyDiooLoAXwvs42CPdgVKhqRwjqiUHok8gs&photoreference=' + this.state.review.photo}}
                />
            <View style={styles.container}>

                <Text style={styles.title}>{this.state.review.breweryName}</Text>
                {<View>
                <Text style={styles.radio_final_title}>Username: {this.state.review.username}</Text>
                <Text style={styles.radio_final_title}>Overall Rating?</Text>
                <StarRating
                    maxStars={5}
                    disabled={true}
                    rating={this.state.review.overallRating}
                    fullStarColor={'#eaaa00'}
                    disabled={true}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                <Text>Enough changing tables? {(this.state.review.hasChangingTables >= .5) ? 'Yes' : 'No'}</Text>
                <Text>Family restroom available? {(this.state.review.hasFamilyRestroom >= .5) ? 'Yes' : 'No'}</Text>
                <Text>Wheelchair accessible? {(this.state.review.isWheelchairAccessible >= .5) ? 'Yes' : 'No'}</Text>                
                <Text style={styles.radio_title}>Seating Arrangements?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.seatingArrangements}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />

                <Text style={styles.radio_title}>Kid Friendly?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.kidFriendly}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Safety?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.safety}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Pet Friendly?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.petFriendly}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Food Option Diversity?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.foodOptionDiversity}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Non Alcoholic Options?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.nonAlcoholicOptions}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />

                <Text style={styles.radio_title}>Sound Level?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.soundLevel}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Smoking (1) restricted (5) prevalent</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.isSmokingPermitted}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for stroller kids?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.strollerKids}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for K-6 kids?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.kThroughSix}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for teenagers?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.review.teenagers}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                </View>}
                <Text style={{width: '100%'}}>Comments:</Text>
                <Text style={{width: '100%'}}>"{this.state.review.comments}"</Text>
            </View>
            </ScrollView>

            {this.state.review.userId === firebaseApp.auth().currentUser.uid && <View>
            <FAB 
                buttonColor="green"
                iconTextColor="#FFFFFF"
                onClickAction={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: new Brewery(), review: this.state.review})}
                visible={true}
                iconTextComponent={<Icon name="md-create"/>} />
            </View>}
            </View>  
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  list_item_title: {
      fontWeight: 'bold',
  }
});