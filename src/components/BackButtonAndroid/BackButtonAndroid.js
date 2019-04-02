import React, { Component } from 'react';
import { BackHandler, Alert } from 'react-native';

class BackButtonAndroid extends Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );
  }

  onBackButtonPressAndroid = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert('Confirm exit', 'Do you want to quit the app?', [
        { text: 'CANCEL' },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }
    return false;
  };

  render() {
    return this.props.children;
  }
}

export default BackButtonAndroid;
