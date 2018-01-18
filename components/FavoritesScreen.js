import React from 'react';
import _ from 'lodash';
import { StyleSheet, View, Text } from 'react-native';
import { Footer, Container, List, ListItem } from 'native-base';

export class FavoritesScreen extends React.Component {


    constructor() {
        super();
    }

    render() {
        return (
            <Container>
            <View>
                {this.renderContent()}
            </View>
            <Footer>
                {this.props.renderTabs()}
            </Footer>
            </Container>
        )
    }

    renderContent() {
        return (
            <List style={styles.listStyle}>
                {this.renderFavoritesList()}
            </List>
        );
    }

    renderFavoritesList() {
        favorites = ["Brewery 1", "Brewery 2", "Brewery 3", "Brewery 4", "Brewery 5"];
        return (
            <View>
            <ListItem><Text style={{width: '100%'}}>Brewery 1</Text></ListItem>
            <ListItem><Text style={{width: '100%'}}>Brewery 2</Text></ListItem>
            </View>
        )
        /*return _.forEach(favorites, (value) => {
            return (
                <ListItem>
                    <Text>{value}</Text>
                </ListItem>
            )
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
  listStyle: {
    flex: 1,
    backgroundColor: "#fff",
    width: '100%'
  }
})