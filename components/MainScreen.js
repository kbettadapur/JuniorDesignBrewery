import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { MapView } from 'expo';
import { FooterTab, Icon, Button, Footer } from 'native-base';
import { MapScreen } from './MapScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { YourReviewsScreen } from './YourReviewsScreen';
import { ProfileScreen } from './ProfileScreen';


const MAP_TAB = "Map";
const FAVORITES_TAB = "Favorites";
const YOUR_REVIEWS_TAB = "Your Reviews";
const PROFILE_TAB = "Profile";

export class MainScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Brewery Trackr",
        headerStyle:  { backgroundColor: "#2196F3", },
        headerTitleStyle: { color: "#FFFFFF" },
        headerTintColor: "blue",
        headerLeft: null,
        headerRight: (<View style={{paddingRight:15}}>
                    <TouchableOpacity onPress={() => a.sortClick()} hitSlop={{top:40, bottom:40, right:40, left:40}}>
                        <Icon style={{color:"#FFFFFF"}}name="md-more"/>
                    </TouchableOpacity></View>),    
    });

  constructor(props) {
    super();
    a = this;
    this.state = {
        selectedTab: MAP_TAB,
        title: "Map",
        sort:"",
    };
  }

  sortClick() {
      this.setState({sort:"Alphabetical"})
      this.forceUpdate()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderComponent()}
      </View>
    );
  }

  renderComponent() {
    return (
      <View style={styles.container}>
          {this.renderPageContent()}
      </View>
    );
  }

  renderPageContent() {
    switch (this.state.selectedTab) {
        case MAP_TAB:
            return (
                <MapScreen
                    renderTabs={() => this.renderTabs()}
                    navigation={this.props.navigation}
                    sort={this.state.sort}
                />
            );
        case FAVORITES_TAB:
            return (
              <FavoritesScreen
                    renderTabs={() => this.renderTabs()}
                    navigation={this.props.navigation}
                />
            );
        case YOUR_REVIEWS_TAB:
            return (
              <YourReviewsScreen
                    renderTabs={() => this.renderTabs()}
                    navigation={this.props.navigation}
                />
            );
        case PROFILE_TAB:
            return (
              <ProfileScreen
                    renderTabs={() => this.renderTabs()}
                    navigation={this.props.navigation}
                />
            );

        default: return null;
    }
  }

  renderTabs() {
    return (
      <FooterTab>
          <Button
              active={this.state.selectedTab === MAP_TAB}
              onPress={() => this.changeTab(MAP_TAB)}
          >
              <Icon name="md-beer" />
              <Text>{"Breweries"}</Text>
          </Button>
          <Button
              active={this.state.selectedTab === FAVORITES_TAB}
              onPress={() => this.changeTab(FAVORITES_TAB)}
          >
              <Icon name="star" />
              <Text>{"Favorites"}</Text>
          </Button>
          <Button
              active={this.state.selectedTab === YOUR_REVIEWS_TAB}
              onPress={() => this.changeTab(YOUR_REVIEWS_TAB)}
          >
              <Icon name="list" />
              <Text>{"Your Reviews"}</Text>
          </Button>
          <Button
              active={this.state.selectedTab === PROFILE_TAB}
              onPress={() => this.changeTab(PROFILE_TAB)}
          >
              <Icon name="more" />
              <Text>{"Profile"}</Text>
          </Button>
      </FooterTab>
    );
  }
  
  changeTab(tabName) {
        this.setState({selectedTab: tabName, title: tabName});
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
});
