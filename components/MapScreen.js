import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { Footer, Container } from 'native-base';
import _ from 'lodash';
import Brewery from '../models/Brewery';
import firebaseApp from '../firebase';
//import FetchHelper from "../httpnet/FetchHelper";

export class MapScreen extends React.Component {
    breweries;

    constructor() {
        super();
        this.state = {
            query: "",
            breweries: []
        }
        
        
    }

    render() {
        return (
            <Container>
            <View style={{flex: 1}}>
                <MapView 
                    style={styles.map}
                    initialRegion={{
                    latitude: 33.753746,
                    longitude: -84.386330,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,}}>
                
                    {/*<MapView.Marker
                        coordinate={{latitude: 33.753746, longitude: -84.386330}}
                     />*/}
                    {this.renderMapViewMarkers()}
                
                </MapView>
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
                        >
                            <MapView.Callout>
                                <Text>{val.name}</Text>
                            </MapView.Callout>
                        </MapView.Marker>
                    )
                })
            )
        }
    }

    search() {
        console.log(this.state.query);
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDiooLoAXwvs42CPdgVKhqRwjqiUHok8gs&location=33.753746,-84.386330&radius=10000&name=brewery&keyword=' + this.state.query)
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
        /*FetchHelper.fetchBreweries(this.state.query).then((ret) => {
            console.log(ret);
        });*/
    }
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