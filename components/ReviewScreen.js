/*
* Review Overview Screen from the Family Friendly Brewery Tracker
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
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
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
        headerTintColor: "white"
    });

    constructor(props) {
        super(props);
        this.state = {
            review: this.props.navigation.state.params.review,
            photo: null,
            didMount: false,
        }
        firebaseApp.database().ref("Users/" + this.state.review.userId + "/profile_picture").on('value', (snapshot) => {
            if(snapshot.val() != null) {
                this.state.photo = snapshot.val();
                this.setState({photo: this.state.photo});
            }
        });
    }
    componentDidMount() {
        this.state.didMount = true;
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
                <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}} onPress={() => this.props.navigation.navigate("ProfileView", {id: this.state.review.userId})}>
                    <View style={{flex: 1, paddingTop: 7, paddingRight: 10}}>
                        <Image style={{height: 50, width: 50, borderRadius: 100}} 
                            source={{uri: 'data:image/png;base64,' + this.state.photo}}>
                        </Image>
                    </View>
                    <View style={{flex: 6, display:'flex'}}>
                        <View style={{flex:2, marginTop: 10}}>
                            <Text style={{fontWeight:'bold', fontSize: 15}}>{this.state.review.username}</Text>
                        </View>
                        <View style={{flex: 2}}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.state.review.overallRating}
                            fullStarColor={'#eaaa00'}
                            starSize={20}
                            containerStyle={{width: '25%'}}
                        />
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={styles.radio_title}>
                <Text>Enough changing tables:</Text>
                <Text style={{fontWeight:'bold'}}> {(this.state.review.hasChangingTables >= .5) ? 'Yes' : 'No'} </Text>
                </Text>
                <Text style={styles.radio_title}>
                <Text>Family restroom availabality:</Text>
                <Text style={{fontWeight:'bold'}}> {(this.state.review.hasFamilyRestroom >= .5) ? 'Yes' : 'No'}</Text>
                </Text>
                <Text style={styles.radio_title}>
                <Text>Wheelchair accessible:</Text>
                <Text style={{fontWeight:'bold'}}> {(this.state.review.isWheelchairAccessible >= .5) ? 'Yes' : 'No'}</Text>   
                </Text>              
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
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  list_item_title: {
      fontWeight: 'bold',
  },
  radio_title: {
    marginTop: 5,
  },
  image_style: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
});