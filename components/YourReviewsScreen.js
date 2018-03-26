import React from 'react';
import _ from 'lodash';
import { StyleSheet, View, Text } from 'react-native';
import { Footer, Container, List, ListItem } from 'native-base';
import firebaseApp from '../firebase';

export class YourReviewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
        }
        firebaseApp.database().ref("Reviews").on('value', (snapshot) => {
            this.state.reviews = [];
            console.log(snapshot.val());
            var keys = Object.keys(snapshot.val());
            keys.forEach((key) => {
                if(snapshot.val()[key].userID === firebaseApp.auth().currentUser.userID) {
                    console.log(snapshot.val()[key])
                    this.state.reviews.push(snapshot.val()[key]);
                }
            });
            this.setState({reviews: this.state.reviews});
        });
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
        return _.map(this.state.reviews, (fav) => {
            return (
                <ListItem key={this.hashCode(fav)}>
                    <Text style={{width: '100%'}} 
                    onPress={() => this.props.navigation.navigate("ReviewView", {navigation: this.props.navigation, review: fav})}>
                    {fav.breweryName}
                    </Text>
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