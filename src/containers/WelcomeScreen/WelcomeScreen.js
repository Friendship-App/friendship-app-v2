import React from "react";
import {connect} from "react-redux";
import {NavigationActions, StackActions} from 'react-navigation';
import Welcome from "../../components/Welcome";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  register: () => dispatch(NavigationActions.navigate({routeName: 'Locations'})),
  login: () => dispatch(NavigationActions.navigate({routeName: 'Login'})),
  openApp: () => dispatch(StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Home'})]
  })),
});

class WelcomeScreen extends React.Component {
  componentWillMount() {
    const {auth, openApp} = this.props;
    if (auth.isAuthenticated) {
      openApp();
    }
  }

  render () {
    const {register, login} = this.props;
    return (
      <Welcome
        handleRegister={register}
        handleLogin={login}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)