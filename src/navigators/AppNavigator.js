import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator, NavigationActions} from 'react-navigation';
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers';
import routes from "../routes";
import {BackHandler} from "react-native";

const RootNavigator = createStackNavigator(routes);

const initialState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams('WelcomeScreen'));

const navReducer = (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const WrappedRootNavigator = reduxifyNavigator(RootNavigator, "root");

const mapStateToProps = state => ({
  nav: state.nav,
});

class Navigator extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const {dispatch, nav} = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const {dispatch, nav} = this.props;
    return (<WrappedRootNavigator state={nav} dispatch={dispatch}/>)
  }
}

const AppNavigator = connect(mapStateToProps, null)(Navigator);

export {AppNavigator, middleware, navReducer};