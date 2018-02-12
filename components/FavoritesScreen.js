/*
* Favorites Screen from the Family Friendly Brewery Tracker
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
                    <ListItem key={this.hashCode(fav)}>
                        <Text style={{width: '100%'}}>{fav}</Text>
                    </ListItem>
                )
            })
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
  }
})