import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import Welcome from '../../components/Welcome';
import { fetchBatchUsers, fetchUserInformation } from '../../actions/users';
import { fetchUserTags } from '../../actions/tags';
import { fetchUserPersonalities } from '../../actions/personalities';
import { fetchChatrooms } from '../../actions/chatrooms';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  register: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Locations' })),
  login: () => dispatch(NavigationActions.navigate({ routeName: 'Login' })),
  openApp: () => {
    // Load user details
    dispatch(fetchUserInformation());
    dispatch(fetchUserTags());
    dispatch(fetchUserPersonalities());

    // Load people
    dispatch(fetchBatchUsers(0));

    // Load chatrooms
    dispatch(fetchChatrooms());

    // Load events
    return dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      }),
    );
  },
});

class WelcomeScreen extends React.Component {
  componentWillMount() {
    const { auth, openApp } = this.props;
    if (auth.isAuthenticated) {
      openApp();
    }
  }

  render() {
    const { register, login } = this.props;
    return <Welcome handleRegister={register} handleLogin={login} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomeScreen);
