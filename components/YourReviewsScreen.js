/*
* Your Reviews Screen from the Family Friendly Brewery Tracker
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
import _ from 'lodash';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Footer, Container, List, ListItem } from 'native-base';
import firebaseApp from '../firebase';
import StarRating from 'react-native-star-rating';
import {  Constants, Location, Permissions } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';

export class YourReviewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            location: {
                lat: 0,
                lng: 0,
            },
            spinnerVisible: true,
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
            this.setState({spinnerVisible: false});
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
            <Spinner overlayColor={"rgba(0, 0, 0, 0.3)"} 
                        color={"rgba(66,137,244)"}
                        visible={this.state.spinnerVisible} 
                        textStyle={{color: '#000000'}} />
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
                <List style={styles.listStyle}>
                    {this.renderFavoritesList()}
                </List>
            </List>
        );
    }

    renderFavoritesList() {
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
  listStyle: {
    flex: 1,
    backgroundColor: "#fff",
    width: '100%'
  },
})