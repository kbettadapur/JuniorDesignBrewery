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
            pictures: null,
            revsAvg: new Review(),
            rev: null,
            favorited: false,
            isMounted: false,
        }
        global.main = false;
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
            this.state.pictures = [];
            if (snapshot.val() != null) {
                var keys = Object.keys(snapshot.val());
                    keys.forEach((key) => {
                        if (snapshot.val()[key].breweryId == this.state.brewery.placeId) {
                            this.state.reviews.push(snapshot.val()[key]);
                            if(snapshot.val()[key].userId === firebaseApp.auth().currentUser.uid) {
                                this.state.rev = snapshot.val()[key];
                            }

                            firebaseApp.database().ref("Users/" + snapshot.val()[key].userId).on('value', (data) => {
                                this.state.pictures.push(data.val().avatar);
                                if (this.state.isMounted)
                                    this.setState({});
                            });
                            // while (this.state.pictures.length != this.state.reviews.length) { }
                        }
                    });
                }
            if(this.state.isMounted)
                this.setState({});
        });
    }
    componentDidMount() {
        // set handler method with setParams
        this.props.navigation.setParams({ 
          setFavorite: this._setFavorite.bind(this),
          fave: this.state.favorited,  
        });
        this.state.isMounted = true;
    }
    _setFavorite() {
        if(this.state.isMounted) {
            this.state.favorited = !this.state.favorited;
            this.props.navigation.setParams({fave: this.state.favorited})
        }
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
                {!!(this.state.reviews != null && this.state.reviews.length > 0) && <View>
                    <Text style={styles.radio_title_top}>{'\n'}Overall Rating</Text>
                    <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={this.state.revsAvg.overallRating}
                                fullStarColor={'#eaaa00'}
                                starSize={20}
                                containerStyle={{width: '25%'}}
                            />            
    
                    <Text style={styles.radio_title_top}>{'\n'}Overall Kid Friendliness</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.kidFriendly}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    />
                    <View style={{marginLeft: 10}}>
                        
                    {!!this.state.revsAvg.strollerKids &&
                    <View>
                    <Text style={styles.radio_title}>Stroller Kids</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.strollerKids}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    
                    {!!this.state.revsAvg.kThroughSix &&
                    <View>
                    <Text style={styles.radio_title}>K-6</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.kThroughSix}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    
                    {!!this.state.revsAvg.kThroughSix &&
                    <View>
                    <Text style={styles.radio_title}>Teenagers</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.teenagers}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
    
                    </View>
                    <Text style={styles.radio_title_top}>{'\n'}Overall Environment Quality</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.environment}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    />
                    <View style={{marginLeft: 10}}>
                    {!!this.state.revsAvg.isSmokingPermitted &&
                    <View>
                    <Text style={styles.radio_title}>Smoking (1) restricted (5) prevalent</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.isSmokingPermitted}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    {!!this.state.revsAvg.seatingArrangements && 
                    <View>
                    <Text style={styles.radio_title}>Seating Arrangements</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.seatingArrangements}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    
                    {!!this.state.revsAvg.safety &&
                    <View>
                    <Text style={styles.radio_title}>Safety</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.safety}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    
                    {!!this.state.revsAvg.petFriendly &&
                    <View>
                    <Text style={styles.radio_title}>Pet Friendliness</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.petFriendly}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    
                    {!!this.state.revsAvg.cleanliness &&
                    <View>
                    <Text style={styles.radio_title}>Cleanliness</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.cleanliness}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
    
                    {!!this.state.revsAvg.soundLevel &&
                    <View>
                    <Text style={styles.radio_title}>Sound Level</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.soundLevel}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    </View>
                    <Text style={styles.radio_title_top}>{'\n'}Overall Food Quality</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.overallFood}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    />
                    <View style={{marginLeft: 10}}>
                    {!!this.state.revsAvg.foodOptionDiversity &&
                    <View>
                    <Text style={styles.radio_title}>Food Option Diversity</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.foodOptionDiversity}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    {!!this.state.revsAvg.nonAlcoholicOptions &&
                    <View>
                    <Text style={styles.radio_title}>Non Alcoholic Options</Text>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.revsAvg.nonAlcoholicOptions}
                        fullStarColor={'#eaaa00'}
                        starSize={20}
                        containerStyle={{width: '25%'}}
                    /></View>}
                    </View>
                    <Text style={styles.radio_title_top}>{'\n'}Logistics</Text>
                    <Text style={styles.radio_title}>
                    <Text>Enough changing tables:</Text>
                    <Text style={{fontWeight:'bold'}}> {(this.state.revsAvg.hasChangingTables >= .5) ? 'Yes' : 'No'} </Text>
                    </Text>
                    <Text style={styles.radio_title}>
                    <Text>Family restroom availabality:</Text>
                    <Text style={{fontWeight:'bold'}}> {(this.state.revsAvg.hasFamilyRestroom >= .5) ? 'Yes' : 'No'}</Text>
                    </Text>
                    <Text style={styles.radio_title}>
                    <Text>Wheelchair accessible:</Text>
                    <Text style={{fontWeight:'bold'}}> {(this.state.revsAvg.isWheelchairAccessible >= .5) ? 'Yes' : 'No'}</Text>   
                    </Text>
                    <Text style={styles.radio_title_top}>Reviews:</Text>
                    <View>{this.renderContent()}</View>
                    </View>
                }                
            </View>
            </ScrollView>

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
        if (this.state.reviews != null && this.state.reviews.length > 0 && this.state.pictures.length == this.state.reviews.length) {
            counter = 0;
            return _.map(this.state.reviews, (rev) => {
                    return (
                        <ListItem key={new Date().getTime()}>
                            <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}} onPress={() => this.props.navigation.navigate("ReviewView", {navigation: this.props.navigation, review: rev})}>
                                <View style={{flex: 1, paddingTop: 7, paddingRight: 10}}>
                                    <Image style={{height: 50, width: 50, borderRadius: 100}} source={{uri:'data:image/png;base64,' + this.state.pictures[counter++].join('')}}></Image>
                                </View>
                                <View style={{flex: 5}}>
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
                    );
                }); 
        } else if(this.state.reviews != null && this.state.reviews.length == 0 && !this.state.spinnerVisible) {
            return (
                <Text style={{textAlign: 'center'}}>No Reviews Yet!</Text>
            )
        }
    }

    calcAvg(revs) {
        this.state.revsAvg.overallRating = this.avg(revs, "overallRating");
        this.state.revsAvg.kidFriendly = this.avg(revs,"kidFriendly");
        this.state.revsAvg.strollerKids = this.avg(revs, "strollerKids");
        this.state.revsAvg.kThroughSix = this.avg(revs, "kThroughSix");
        this.state.revsAvg.teenagers = this.avg(revs, "teenagers");
        this.state.revsAvg.environment = this.avg(revs, "environment");
        this.state.revsAvg.isSmokingPermitted = this.avg(revs, "isSmokingPermitted");
        this.state.revsAvg.seatingArrangements = this.avg(revs, "seatingArrangements");
        this.state.revsAvg.safety = this.avg(revs, "safety");
        this.state.revsAvg.petFriendly = this.avg(revs, "petFriendly");
        this.state.revsAvg.cleanliness = this.avg(revs,"cleanliness");
        this.state.revsAvg.soundLevel = this.avg(revs, "soundLevel");
        this.state.revsAvg.overallFood = this.avg(revs, "overallFood");
        this.state.revsAvg.foodOptionDiversity = this.avg(revs, "foodOptionDiversity");
        this.state.revsAvg.nonAlcoholicOptions = this.avg(revs, "nonAlcoholicOptions");
        this.state.revsAvg.hasChangingTables = this.avg2(revs, "hasChangingTables");
        this.state.revsAvg.hasFamilyRestroom = this.avg2(revs, "hasFamilyRestroom");
        this.state.revsAvg.isWheelchairAccessible = this.avg2(revs, "isWheelchairAccessible");        
    }

    avg(revs, prop) {
        cntr = 0;
        sum = 0;
        revs.forEach((rev) =>{
            if(parseInt(rev[prop])) {
                cntr++;
                sum += parseInt(rev[prop])
            }
        })
        if(cntr)
            return sum / cntr;
        return null;
    }

    avg2(revs, prop) {
        cntr = 0;
        sum = 0;
        revs.forEach((rev) =>{
            cntr++;
            sum += parseInt(rev[prop])
        })
        if(cntr)
            return sum / cntr;
        return null;
    }}

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
  },
  radio_title_top: {
    marginTop: 5,
    fontWeight: 'bold',
  }
});