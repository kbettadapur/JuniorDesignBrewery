import React from 'react';
import _ from 'lodash';
import { StyleSheet, View, Text } from 'react-native';
import { Footer, Container, List, ListItem } from 'native-base';

export class FavoritesScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Favorites",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue"
    });

    constructor() {
        super();
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
        favorites = ["Brewery 1", "Brewery 2", "Brewery 3", "Brewery 4", "Brewery 5"];
        return _.map(favorites, (fav) => {
                return (
                    <ListItem>
                        <Text style={{width: '100%'}}>{fav}</Text>
                    </ListItem>
                )
            })
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