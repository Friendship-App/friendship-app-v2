import React from 'react';
import {Provider} from 'react-redux';
import {AppNavigator, middleware, navReducer} from './src/navigators/AppNavigator';
import configureStore from "./src/store/configureStore";
import {persistStore} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
import Loading from "./src/components/Loading";

const store = configureStore(navReducer, middleware);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading/>} persistor={persistStore(store)}>
          <AppNavigator/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;