import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {AsyncStorage} from "react-native";
import {persistReducer} from "redux-persist";

const composeEnhancers =
  typeof window !== 'undefined' && (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
};

const configureStore = (navReducer, middleware) => (
  createStore(
    persistReducer(persistConfig, rootReducer(navReducer)),
    composeEnhancers(
      applyMiddleware(thunk, middleware),
    ),
  )
);

export default configureStore;
