import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Footer, Container } from 'native-base';

export class YourReviewsScreen extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
            <View style={{flex: 1}}>
                <Text>Your Reviews Screen</Text>
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
})