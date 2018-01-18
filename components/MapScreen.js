import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, View, Text } from 'react-native';
import { Footer, Container } from 'native-base';

export class MapScreen extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
            <View style={{flex: 1}}>
                <MapView 
                    style={styles.map}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,}} />
            </View>
            <Footer style={{width: '100%'}}>
                {this.props.renderTabs()}
            </Footer>
            </Container>
        )
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
  }
})