/*
* Brewery Overview Screen from the Family Friendly Brewery Tracker
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
import Spinner from 'react-native-loading-spinner-overlay';

export class BreweryScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Brewery",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "white",
        headerRight: 
            (<View style={{width:40}}>
                    <Icon style={{paddingRight: 15, color:"#FFFFFF"}}
                    name={(navigation.state.params.fave) ? "md-star" : "md-star-outline"}
                    onPress={() => {navigation.state.params.setFavorite() }}/>
                    
            </View>), 
    });

    constructor(props) {
        super(props);
        this.state = {
            brewery: this.props.navigation.state.params.brewery,
            reviews: null,
            revsAvg: new Review(),
            rev: null,
            favorited: false,
        }
        firebaseApp.database().ref("Users/" + firebaseApp.auth().currentUser.uid + "/Favorites/").on('value', (snapshot) => {
            if(snapshot.val() != null) {
                var keys = Object.keys(snapshot.val());
                keys.forEach((key) => {
                    if (snapshot.val()[key].id === this.state.brewery.placeId) {
                        this.props.navigation.setParams({fave: true});
                        this.state.favorited = true;
                    }
                });
            }
        });
        firebaseApp.database().ref("Reviews").on('value', (snapshot) => {
            this.state.reviews = [];
            var keys = Object.keys(snapshot.val());
            keys.forEach((key) => {
                if (snapshot.val()[key].breweryId == this.state.brewery.placeId) {
                    this.state.reviews.push(snapshot.val()[key]);
                    if(snapshot.val()[key].userId === firebaseApp.auth().currentUser.uid) {
                       this.state.rev = snapshot.val()[key];
                    }
                }
            });
            this.setState({reviews: this.state.reviews});

        });
    }
    componentDidMount() {
        // set handler method with setParams
        this.props.navigation.setParams({ 
          setFavorite: this._setFavorite.bind(this),
          fave: this.state.favorited,  
        });
    }
    _setFavorite() {
        this.state.favorited = !this.state.favorited;
        this.props.navigation.setParams({fave: this.state.favorited})
        if(this.state.favorited) {
            firebaseApp.database().ref("Users/" + firebaseApp.auth().currentUser.uid + "/Favorites/" + this.state.brewery.name).set({
                name: this.state.brewery.name,
                id: this.state.brewery.placeId,
                latitude: this.state.brewery.latitude,
                longitude: this.state.brewery.longitude,
                photo: this.state.brewery.photo,
            })
        } else {
            firebaseApp.database().ref("Users/" + firebaseApp.auth().currentUser.uid + "/Favorites/" + this.state.brewery.name).remove();        
        }
    }
    render() {
        if(this.state.reviews != null && this.state.reviews.length > 0) {
            this.state.revsAvg = new Review();
            this.calcAvg(this.state.reviews)
        }  
        return (
            <View style={{height: '100%'}}>
            <Spinner overlayColor={"rgba(0, 0, 0, 0.3)"} 
                        color={"rgb(66,137,244)"}
                        visible={this.state.reviews == null} 
                        textStyle={{color: '#000000'}} />
            <ScrollView style={{backgroundColor: '#fff'}}>
            <Image
                    style={{width: '100%', height: 200}}
                    source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&key=AIzaSyDiooLoAXwvs42CPdgVKhqRwjqiUHok8gs&photoreference=' + this.state.brewery.photo}}
                />
            <View style={styles.container}>
                
                <Text style={styles.title}>{this.state.brewery.name}</Text>
                { (this.state.reviews != null && this.state.reviews.length > 0) && <View>
                <Text style={styles.radio_final_title}>Overall Rating?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.overallRating}
                    fullStarColor={'#eaaa00'}
                    disabled={true}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                <Text style={styles.radio_title}>
                <Text>Enough changing tables?</Text>
                <Text style={{fontWeight:'bold'}}> {(this.state.revsAvg.hasChangingTables >= .5) ? 'Yes' : 'No'} </Text>
                </Text>
                <Text style={styles.radio_title}>
                <Text>Family restroom available?</Text>
                <Text style={{fontWeight:'bold'}}> {(this.state.revsAvg.hasFamilyRestroom >= .5) ? 'Yes' : 'No'}</Text>
                </Text>
                <Text style={styles.radio_title}>
                <Text>Wheelchair accessible?</Text>
                <Text style={{fontWeight:'bold'}}> {(this.state.revsAvg.isWheelchairAccessible >= .5) ? 'Yes' : 'No'}</Text>   
                </Text>             
                <Text style={styles.radio_title}>Seating Arrangements?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.seatingArrangements}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />

                <Text style={styles.radio_title}>Kid Friendly?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.kidFriendly}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Safety?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.safety}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Pet Friendly?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.petFriendly}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Food Option Diversity?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.foodOptionDiversity}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Non Alcoholic Options?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.nonAlcoholicOptions}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />

                <Text style={styles.radio_title}>Sound Level?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.soundLevel}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>Smoking (1) restricted (5) prevalent</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.isSmokingPermitted}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for stroller kids?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.strollerKids}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for K-6 kids?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.kThroughSix}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                
                <Text style={styles.radio_title}>How good is it for teenagers?</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.revsAvg.teenagers}
                    fullStarColor={'#eaaa00'}
                    starSize={20}
                    containerStyle={{width: '25%'}}
                />
                <Text style={styles.subtitle}>Reviews</Text>
                </View>
            }
                {this.renderContent()}
                
            </View>
            </ScrollView>
            {/*<Button title="Add Review" onPress={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: this.state.brewery})}></Button>
            */}
            {(this.state.rev == null && this.state.reviews != null) && <View>
            <FAB 
                buttonColor="green"
                iconTextColor="#FFFFFF"
                onClickAction={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: this.state.brewery, review: this.state.rev})}
                visible={true}
                iconTextComponent={<Icon name="md-add"/>} />
            </View>}
            {this.state.rev != null && <View>
            <FAB 
                buttonColor="green"
                iconTextColor="#FFFFFF"
                onClickAction={() => this.props.navigation.navigate("AddReview", {navigation: this.props.navigation, brewery: this.state.brewery, review: this.state.rev})}
                visible={true}
                iconTextComponent={<Icon name="md-create"/>} />
            </View>}
            </View>  
        )
    }
    renderContent() {
        return (
            <List style={styles.listStyle}>
                <List>
                    {this.renderReviewsList()}
                </List>
            </List>
        );
    }

    renderReviewsList() {
        if (this.state.reviews != null && this.state.reviews.length > 0) {
        return _.map(this.state.reviews, (rev) => {
                return (
                    <ListItem key={new Date().getTime()}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ReviewView", {navigation: this.props.navigation, review: rev})}>
                            <View style={{width: '100%'}}>
                                <Text style={styles.list_item_title}>{rev.username}</Text>
                                <Text style={{width: '100%'}}>"{rev.comments}"</Text>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={rev.overallRating}
                                    fullStarColor={'#eaaa00'}
                                    starSize={20}
                                    containerStyle={{width: '25%'}}
                                />
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                )
            })  
        } else if(this.state.reviews != null && !this.state.spinnerVisible) {
            return (
                <Text style={{textAlign: 'center'}}>No Reviews Yet!</Text>
            )
        }
    }

    calcAvg(revs) {

        revs.forEach((rev) => {
            
           this.state.revsAvg.hasChangingTables += parseInt(rev.hasChangingTables);
           this.state.revsAvg.hasFamilyRestroom += parseInt(rev.hasFamilyRestroom);
           this.state.revsAvg.isWheelchairAccessible += parseInt(rev.isWheelchairAccessible);
           this.state.revsAvg.overallRating += parseInt(rev.overallRating);
           this.state.revsAvg.seatingArrangements += rev.seatingArrangements;
           this.state.revsAvg.kidFriendly += rev.seatingArrangements;
           this.state.revsAvg.safety += rev.safety;
           this.state.revsAvg.petFriendly += rev.petFriendly;
           this.state.revsAvg.foodOptionDiversity += rev.foodOptionDiversity;
           this.state.revsAvg.nonAlcoholicOptions += rev.nonAlcoholicOptions;
           this.state.revsAvg.soundLevel += rev.soundLevel;
           this.state.revsAvg.isSmokingPermitted += rev.soundLevel;
           this.state.revsAvg.strollerKids += rev.strollerKids;
           this.state.revsAvg.kThroughSix += rev.kThroughSix;
           this.state.revsAvg.teenagers += rev.teenagers;
        }) 
       this.state.revsAvg.hasChangingTables /= revs.length;
       this.state.revsAvg.hasFamilyRestroom /= revs.length;
       this.state.revsAvg.isWheelchairAccessible /= revs.length;
       this.state.revsAvg.overallRating  /= revs.length;
       this.state.revsAvg.seatingArrangements /= revs.length;
       this.state.revsAvg.kidFriendly  /= revs.length;
       this.state.revsAvg.safety  /= revs.length;
       this.state.revsAvg.petFriendly  /= revs.length;
       this.state.revsAvg.foodOptionDiversity  /= revs.length;
       this.state.revsAvg.nonAlcoholicOptions  /= revs.length;
       this.state.revsAvg.soundLevel  /= revs.length;
       this.state.revsAvg.isSmokingPermitted  /= revs.length;
       this.state.revsAvg.strollerKids  /= revs.length;
       this.state.revsAvg.kThroughSix  /= revs.length;
       this.state.revsAvg.teenagers  /= revs.length;
    }
}

const styles = StyleSheet.create({
  container: {
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
  }
});