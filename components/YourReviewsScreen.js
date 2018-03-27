import React from 'react';
import _ from 'lodash';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Footer, Container, List, ListItem } from 'native-base';
import firebaseApp from '../firebase';
import StarRating from 'react-native-star-rating';
import {  Constants, Location, Permissions } from 'expo';

export class YourReviewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            location: {
                lat: 0,
                lng: 0,
            },
        }
        firebaseApp.database().ref("Reviews").on('value', (snapshot) => {
            this.state.reviews = [];
            console.log(snapshot.val());
            var keys = Object.keys(snapshot.val());
            keys.forEach((key) => {
                if(snapshot.val()[key].userId === firebaseApp.auth().currentUser.uid) {
                    console.log(snapshot.val()[key])
                    this.state.reviews.push(snapshot.val()[key]);
                }
            });
            this.setState({reviews: this.state.reviews});
        });
    }

    componentWillMount() {
        this._getLocationAsync()
    }
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log("Denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({location});
        console.log(this.state.location);
    }

    render() {
        return (
            <Container>
            <View style={{flex: 1}}>
                {this.renderContent()}
            </View>
            <Footer style={{width: '100%'}}>
                {this.props.renderTabs()}
            </Footer>
            </Container>
        )
    }

    renderContent() {
        return (
            <List style={styles.listStyle}>
                <List>
                    {this.renderFavoritesList()}
                </List>
            </List>
        );
    }

    renderFavoritesList() {
        console.log(this.props.sort)
        var t = this;
        if(this.props.sort === "Alphabetical") {
            this.state.reviews.sort(function(a, b){
                var textA = a.breweryName.toUpperCase();
                var textB = b.breweryName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        }
        else if(this.props.sort === "Distance") {
            this.state.reviews.sort(function(a,b) {
                var x = t.state.location.coords.latitude;
                var y = t.state.location.coords.longitude;
                var dist1 = Math.sqrt((x - a.latitude) * (x - a.latitude) + (y - a.longitude) * (y - a.longitude))
                var dist2 = Math.sqrt((x - b.latitude) * (x - b.latitude) + (y - b.longitude) * (y - b.longitude))
                return (dist1 < dist2) ? -1 : (dist1 > dist2) ? 1 : 0;               
            })
        } else if(this.props.sort === "Rating") {
            this.state.reviews.sort(function(a, b){
                var textA = a.overallRating;
                var textB = b.overallRating;
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            })
        }
        return _.map(this.state.reviews, (fav) => {
            return (
                    <ListItem key={this.hashCode(fav)}>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("ReviewView", {navigation: this.props.navigation, review: fav})}>
                            <Text style={{width: '100%'}}>
                            {fav.breweryName}
                            </Text>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={fav.overallRating}
                                fullStarColor={'#eaaa00'}
                                starSize={20}
                                containerStyle={{width: '25%'}} />
                        </TouchableOpacity>
                    </ListItem>
            );
        });
    }

    hashCode(s) {
        var h = 0, l = s.length, i = 0;
        if ( l > 0 )
            while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h;
    };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})