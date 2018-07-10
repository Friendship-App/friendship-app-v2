import React from "react";
import {Text, View} from "react-native";
import {styles} from "../../styles";
import {connect} from "react-redux";
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = dispatch => ({
  goto: () => dispatch(NavigationActions.navigate({routeName: 'RegisterScreen'}))
});

class WelcomeScreen extends React.Component {
  componentDidMount () {
    setTimeout(() => {this.props.goto()}, 1000);
  }
  render() {
    return (
      <View style={[styles.rootContainer]}>
        <Text>Hello world</Text>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(WelcomeScreen)