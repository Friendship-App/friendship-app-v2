import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

class WelcomeMessage extends Component {
  render() {
    return (
      <View style={[styles.welcomeView]}>
        <Text style={[styles.WelcomeText]}>FRIEND</Text>
        <Text style={[styles.WelcomeText]}>SHIP !</Text>
        <Text style={[styles.welcomeSubtitle]}>YEAH! & NAAAH</Text>
      </View>
    );
  }
}

WelcomeMessage.propTypes = {};

export default WelcomeMessage;
