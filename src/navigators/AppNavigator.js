import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, NavigationActions } from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';
import routes from '../routes';
import { BackHandler } from 'react-native';
import { registerForPushNotificationsAsync } from '../utils/notifications';
import { fetchChatrooms } from '../actions/chatrooms';
import { socket } from '../utils/socket';

const RootNavigator = createStackNavigator(routes);

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams('WelcomeScreen'),
);

const navReducer = (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const WrappedRootNavigator = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  nav: state.nav,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  refreshChatrooms: () => dispatch(fetchChatrooms()),
});

class Navigator extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    if (this.props.auth.data.decoded) {
      registerForPushNotificationsAsync(this.props.auth.data.decoded.id);
    }
    socket.on('message', () => {
      this.props.refreshChatrooms();
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    socket.close();
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    return <WrappedRootNavigator state={nav} dispatch={dispatch} />;
  }
}

const AppNavigator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigator);

export { AppNavigator, middleware, navReducer };
