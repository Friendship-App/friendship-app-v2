import React from 'react';
import { Provider } from 'react-redux';
import {
  AppNavigator,
  middleware,
  navReducer,
} from './src/navigators/AppNavigator';
import configureStore from './src/store/configureStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './src/components/Loading';
import { Font, Permissions } from 'expo';

const store = configureStore(navReducer, middleware);

class App extends React.Component {
  state = {
    fontLoaded: false,
    cameraRoll: false,
    notification: {},
  };
  async componentDidMount() {
    await Font.loadAsync({
      'NunitoSans-Regular': require('./assets/fonts/NunitoSans/NunitoSans-Regular.ttf'),
      'NunitoSans-Bold': require('./assets/fonts/NunitoSans/NunitoSans-Bold.ttf'),
      'NunitoSans-LightItalic': require('./assets/fonts/NunitoSans/NunitoSans-LightItalic.ttf'),
      'NunitoSans-SemiBold': require('./assets/fonts/NunitoSans/NunitoSans-SemiBold.ttf'),
      'NunitoSans-ExtraBold': require('./assets/fonts/NunitoSans/NunitoSans-ExtraBold.ttf'),
      'NunitoSans-Light': require('./assets/fonts/NunitoSans/NunitoSans-Light.ttf'),
      Friendship_version_2: require('./assets/fonts/Friendship/Friendship.ttf'),
      Futurice: require('./assets/fonts/Friendship/Friendship-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });

    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    this.setState({ cameraRoll: true });
  }

  render() {
    const { fontLoaded, cameraRoll } = this.state;
    if (!fontLoaded || !cameraRoll) {
      return <Loading />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistStore(store)}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
