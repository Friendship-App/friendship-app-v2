import React from "react";
import {connect} from "react-redux";
import {NavigationActions} from 'react-navigation';
import Welcome from "../../components/Welcome";

const mapDispatchToProps = dispatch => ({
  register: () => dispatch(NavigationActions.navigate({routeName: 'Register'})),
  login: () => dispatch(NavigationActions.navigate({routeName: 'LoginScreen'})),
});

const WelcomeScreen = props => (
  <Welcome
    handleRegister={props.register}
    handleLogin={props.login}
  />
);

export default connect(null, mapDispatchToProps)(WelcomeScreen)