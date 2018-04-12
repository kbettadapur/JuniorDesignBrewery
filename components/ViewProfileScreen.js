/*
* External Screen from the Family Friendly Brewery Tracker
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
import { StyleSheet, View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import { Footer, Container, List, ListItem } from 'native-base';
import firebaseApp from '../firebase';
import { ImagePicker, LinearGradient } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import StarRating from 'react-native-star-rating';
console.disableYellowBox = true;

export class ViewProfileScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Profile",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "white", 
    });

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            reviews: null,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg",
            imageBase64: null,
        }
        global.main = false;
        id = this.props.navigation.state.params.id;
        console.log("ID: " + id);
        firebaseApp.database().ref("/Users/" + id).once('value').then((snapshot) => {
            this.setState({user: snapshot.val()});
            console.log(this.state.user.reviews.length);
            if (this.state.user.reviews.length > 3) {
                this.state.user.reviews = this.state.user.reviews.slice(0,3);
                this.setState({});
            }
            this.setState({});
        });

        
    }

    render() {
        return (
            <ScrollView>
            <Container>
                <Spinner overlayColor={"rgba(0, 0, 0, 0.3)"} 
                color={"rgb(66,137,244)"}
                visible={(this.state.user == null)} 
                textStyle={{color: '#000000'}} />
                {this.state.user != null && <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={{alignItems: 'center'}}>
                        <LinearGradient colors={['#0066cc', '#2196F3']} style={{width:'100%', alignItems:'center'}}>
                        <TouchableHighlight>
                            <View>
                                    <Image source={{ uri:  'data:image/png;base64,' + this.state.user.profile_picture}} style={styles.image_style} />
                            </View>
                        </TouchableHighlight>
                        <Text style={styles.title_style}>{this.state.user.username}</Text>
                        {this.state.user.age > 0 && <Text style={[styles.subtitle_style]}>{this.state.user.age == -1 ? "" : this.state.user.age} Years Old</Text>}
                        <Text style={[styles.subtitle_style]}>{(this.state.user.num_children == 0) ? "No Children" : 
                            this.state.user.num_children == 1 ? "1 Child" : this.state.user.num_children + " Children"}
                        </Text>                     
                        <View style={{marginBottom: 10}}/>
                        </LinearGradient>
                    </View>
                    <View style={{width: '100%', padding: 10}}>
                        <Text style={[styles.subtitle_style2]}>Bio</Text>
                        <Text style={styles.subtitle_style3}>{this.state.user.description}</Text>
                    </View>

                    <List>
                        {this.renderReviewsList()}
                    </List>
                </View> }
                {this.state.user == null && <View style={{flex:1}}/>}
                
            </Container>  
            </ScrollView>                     
        );
    }

    renderReviewsList() {
        if (this.state.user == null || this.state.user.reviews == null) {
            return <Text>No Reviews Yet!</Text>
        }
        return _.map(this.state.user.reviews, (rev) => {
            return (
                <ListItem key={this.hashCode(rev.revId)}>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate("ReviewView", {navigation: this.props.navigation, review: rev})}> 
                        <Text style={{width: '100%'}}>{rev.breweryName}</Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={rev.overallRating}
                            fullStarColor={'#eaaa00'}
                            starSize={20}
                            containerStyle={{width: '25%'}}
                        />
                        <Text style={{width:'100%', fontSize:11}}>
                            {rev.comments}
                        </Text>                        
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
      image_style: {
        borderRadius: 100,
        width: 150,
        height: 150,
        marginTop: 20,
      },
      footer_style: {
          width: '100%'
      },
      title_style: {
          textAlign: 'center',
          fontSize: 22,
          fontWeight: 'bold',
          color: 'rgba(255, 255, 255, 0.95)',
      },
      subtitle_style: {
          fontSize: 15,
          color: 'rgba(255, 255, 255, 0.95)',
      },
      subtitle_style2: {
        fontSize: 17,
        color: 'rgba(0, 0, 0, 1)',
        fontWeight: 'bold',
        marginTop: 10,
      },
      subtitle_style3: {
        fontSize: 17,
        color: 'rgba(0, 0, 0, 0.7)',
      }
})