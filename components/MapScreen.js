/*
* Map Screen from the Family Friendly Brewery Tracker
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
import { MapView, Constants, Location, Permissions } from 'expo';
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView } from 'react-native';
import { Footer, Container, Icon, List, ListItem } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';
import FAB from 'react-native-fab';
import StarRating from 'react-native-star-rating';
import current_location from '../current_location.png';


export class MapScreen extends React.Component {
    breweries;

    constructor(props) {
        super(props);
        this.state = {
            query: "",
            breweries: [],
            lat: 0,
            lng: 0,
            mapVisible: true,
        }  

        // this._getLocationAsync().then(() => {
        //     this.searchLocalBreweries();
        // }) 
        this.searchLocalBreweries();
    }
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log("Denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        this.state.lat = location.coords.latitude;
        this.state.lng = location.coords.longitude;
    }
    

    render() {
        return (
            <Container>
            <View style={{flex: 1}}>
                {this.state.mapVisible && this.state.lat != 0 && <MapView 
                    style={styles.map}

                    region={{latitude: this.state.lat,
                    longitude: this.state.lng,
                    latitudeDelta: 0.6,
                    longitudeDelta: 0.6,}}
                    >

                    {this.renderMapViewMarkers()}

                    <MapView.Marker
                            coordinate={{latitude: this.state.lat, longitude: this.state.lng}}
                            name={"Your Location"}
                            image={current_location}
                        ></MapView.Marker>
                
                </MapView>}
                {!this.state.mapVisible && 
                    <ScrollView style={{marginTop: 60}}>
                    <List style={styles.listStyle}>
                            {this.renderListView()}
                        <List>
                        </List>
                    </List> 
                    </ScrollView> 
                }

                {!this.state.mapVisible && 
                <View style={{position:'absolute', right:0, top:140}}>
                <FAB 
                    buttonColor="red"
                    iconTextColor="#FFFFFF"
                    onClickAction={this.mapToggle.bind(this)}
                    visible={true}
                    iconTextComponent={<Icon name="map"/>} />
                </View>}

                {this.state.mapVisible && 
                <View style={{position:'absolute', left:90, top:135}}>
                    <FAB 
                        buttonColor="red"
                        iconTextColor="#FFFFFF"
                        onClickAction={this.mapToggle.bind(this)}
                        visible={true}
                        iconTextComponent={<Icon name="list"/>} />
                </View>}
                <View style={{bottom: 0, right: 0, position: 'absolute'}}>
                    <FAB 
                        buttonColor="blue"
                        iconTextColor="#FFFFFF"
                        onClickAction={this.searchLocalBreweries.bind(this)}
                        visible={true}
                        style={{ position: 'absolute', marginRight: 100}}
                        iconTextComponent={<Icon name="md-pin"/>} />
                </View>

                

                <View style={styles.searchWrapper}>
                    <TextInput style={styles.search}
                            placeholder="Search by city..."
                            onChangeText={(query) => this.setState({query})}
                            value={this.state.query}
                    ></TextInput>
                    <View style={{flex: 1}}/>
                    <Button style={styles.searchButton} title="Search" onPress={this.search.bind(this)}></Button>
                </View>
                
            </View>
            <Footer style={{width: '100%'}}>
                {this.props.renderTabs()}
            </Footer>
            </Container>
        )
    }

    renderMapViewMarkers() {
        if (this.state.breweries) {
            return (
                _.map(this.state.breweries, (val) => {
                   // console.log(val);
                    return (
                        <MapView.Marker
                            coordinate={{latitude: val.latitude, longitude: val.longitude}}
                            key={val.latitude + val.longitude}
                            name={val.name}
                            onCalloutPress={() => this.props.navigation.navigate("Brewery", {navigation: this.props.navigation, brewery: val})}
                        >
                            <MapView.Callout>
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>{val.name}</Text>
                                {val.price && <Text>{'$'.repeat(val.price)}</Text>}
                                <View style={{width: '50%'}}>
                                <StarRating
                                    maxStars={5}
                                    rating={parseInt(val.genRating)}
                                    fullStarColor={'#eaaa00'}
                                    starSize={20}
                                />
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    )
                })
            )
        }
    }

    search() {
        //console.log(this.state.query);
        
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.query + '&key=AIzaSyDiooLoAXwvs42CPdgVKhqRwjqiUHok8gs')
            .then((r) => r.json().then((d) => {
                location = {};
                location.lat = d.results[0].geometry.location.lat;
                location.lng = d.results[0].geometry.location.lng;
                this.setState({location});
            })).then(() => {
                this.searchBreweries(location.lat, location.lng)
            })
    }

    searchLocalBreweries() {
        this._getLocationAsync().then(() => {
            this.searchBreweries(this.state.lat, this.state.lng);
        });
    }


    searchBreweries(lat, lng) {
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/'
                    + 'json?key=AIzaSyDiooLoAXwvs42CPdgVKhqRwjqiUHok8gs'
                    + '&location=' + `${lat}` + ',' + `${lng}`
                    + '&radius=50000&name=brewery&keyword=brewery')
            .then((response) => response.json().then(data => {
                res = []
                var results = JSON.parse(JSON.stringify(data)).results;
                results.forEach((val) => {
                    var b = new Brewery();
                    b.merge(val);
                    res.push(b);
                });
                this.setState({breweries: res, lat: lat, lng: lng});
            }));
    }

    renderListView() {
        counter = 0;
        var t = this;
        if(this.props.sort === "Alphabetical") {
            this.state.breweries.sort(function(a, b){
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        }
        else if(this.props.sort === "Distance") {
            this.state.breweries.sort(function(a,b) {
                var x = t.state.location.coords.latitude;
                var y = t.state.location.coords.longitude;
                var dist1 = Math.sqrt((x - a.latitude) * (x - a.latitude) + (y - a.longitude) * (y - a.longitude))
                var dist2 = Math.sqrt((x - b.latitude) * (x - b.latitude) + (y - b.longitude) * (y - b.longitude))
                return (dist1 < dist2) ? -1 : (dist1 > dist2) ? 1 : 0;               
            })
        } else if(this.props.sort === "Rating") {
            this.state.breweries.sort(function(a, b){
                var textA = a.genRating;
                var textB = b.genRating;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        }
        return _.map(this.state.breweries, (b) => {
            counter = counter + 1;
            return (
                <ListItem key={counter} onPress={() => this.props.navigation.navigate("Brewery", {navigation: this.props.navigation, brewery: b})}>
                    <Text style={{width: '100%'}}>{b.name}</Text>
                </ListItem>
            );
        });
    }

    mapToggle() {
        this.setState({mapVisible: !this.state.mapVisible});
    }
}

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    backgroundColor: "#fff",
    width: '100%'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  search: {
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: 50,
      flex: 15,
      paddingLeft: 5,
      paddingRight: 5
  },
  searchWrapper: {
      position: 'absolute',
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      flex: 1,
      flexDirection: 'row'
  },
  searchButton: {
      flex: 15,
  }
})