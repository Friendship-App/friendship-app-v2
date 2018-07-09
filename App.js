import React from 'react';
import {BackHandler} from 'react-native';
import {createStackNavigator, NavigationActions} from 'react-navigation';
import {createNavigationReducer, createReactNavigationReduxMiddleware,} from 'react-navigation-redux-helpers';
import {connect, Provider} from 'react-redux';
import routes from "./src/routes";
import configureStore from "./src/store/configureStore";

const AppNavigator = createStackNavigator(routes);

const navReducer = createNavigationReducer(AppNavigator);

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

// const App = reduxifyNavigator(AppNavigator, "root");
// console.log(App);
const mapStateToProps = (state) => ({
  nav: state.nav,
});

const store = configureStore(navReducer, middleware);

class App extends React.Component {
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
    return (<AppNavigator/>)
  }
}

const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}

export default Root;