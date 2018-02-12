import React from 'react';
import { MapView, Constants, Location, Permissions } from 'expo';
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView } from 'react-native';
import { Footer, Container, Icon, List, ListItem } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';
import FAB from 'react-native-fab';


export class MapScreen extends React.Component {
    breweries;

    constructor() {
        super();
        this.state = {
            query: "",
            breweries: [],
            location: {
                lat: 0,
                lng: 0,
            },
            mapVisible: true,
        }   
    }

    componentWillMount() {
        this._getLocationAsync().then(() => {
            this.searchLocalBreweries();
        })
    }
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log("Denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({location});
    }
    

    render() {
        return (
            <Container>
            <View style={{flex: 1}}>
                {this.state.mapVisible && <MapView 
                    style={styles.map}
                    initialRegion={{
                    latitude: 33.753746,
                    longitude: -84.386330,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,}}>
                
                    {this.renderMapViewMarkers()}
                
                </MapView>}
                {!this.state.mapVisible && 
                    <ScrollView style={{marginTop: 60}}>
                    <List style={styles.listStyle}>
                        <List>
                            {this.renderListView()}
                        </List>
                    </List> 
                    </ScrollView> 
                }

                {!this.state.mapVisible && 
                <FAB 
                    buttonColor="red"
                    iconTextColor="#FFFFFF"
                    onClickAction={this.mapToggle.bind(this)}
                    visible={true}
                    iconTextComponent={<Icon name="map"/>} />}

                {this.state.mapVisible && 
                <FAB 
                    buttonColor="red"
                    iconTextColor="#FFFFFF"
                    onClickAction={this.mapToggle.bind(this)}
                    visible={true}
                    iconTextComponent={<Icon name="list"/>} />}
                
                <View style={{top: 140, right: 0, position: 'absolute'}}>
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
                            placeholder="Search..."
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
                    return (
                        <MapView.Marker
                            coordinate={{latitude: val.latitude, longitude: val.longitude}}
                            key={val.latitude + val.longitude}
                            name={val.name}
                            onCalloutPress={() => this.props.navigation.navigate("Brewery", {navigation: this.props.navigation})}
                        >
                            <MapView.Callout>
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>{val.name}</Text>
                                <Text>{'Gen Rating: ' + val.genRating}</Text>
                                <Text>{'Price Level: ' + '$'.repeat(val.price)}</Text>
                            </MapView.Callout>
                        </MapView.Marker>
                    )
                })
            )
        }
    }

    search() {
        console.log(this.state.query);
        
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.query + '&key=AIzaSyDiooLoAXwvs42CPdgVKhqRwjqiUHok8gs')
            .then((r) => r.json().then((d) => {
                location = {};
                location.lat = d.results[0].geometry.location.lat;
                location.lng = d.results[0].geometry.location.lng;
                //this.setState({location});
            })).then(() => {
                this.searchBreweries(location.lat, location.lng)
            })
            
        /*FetchHelper.fetchBreweries(this.state.query).then((ret) => {
            console.log(ret);
        });*/
    }

    searchLocalBreweries() {
        this.searchBreweries(this.state.location.coords.latitude, this.state.location.coords.longitude);
    }

    searchBreweries(lat, lng) {
        console.log("LAT: " + lat);
        console.log("LNG: " + lng);
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
                this.setState({breweries: res});
                console.log(this.state.breweries);
            }));
    }

    renderListView() {
        counter = 0;
        return _.map(this.state.breweries, (b) => {
            counter = counter + 1;
            return (
                <ListItem key={counter}>
                    <Text style={{width: '100%'}}>{b.name}</Text>
                </ListItem>
            );
        });
    }

    mapToggle() {
        this.setState({mapVisible: !this.state.mapVisible});
        console.log("Map Toggled");
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