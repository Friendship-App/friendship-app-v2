import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/* Enable redux dev tools only in development.
 * Using React Native Debugger is great for debugging:
 * https://github.com/jhen0409/react-native-debugger
 *
 * More info about the setup:
 * https://github.com/zalmoxisus/redux-devtools-extension#2-use-with-redux
 */

/* eslint-disable */
/* istanbul ignore next line */
const composeEnhancers =
  typeof window !== 'undefined' && (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-enable */

const configureStore = (navReducer, middleware) => (
  createStore(
    rootReducer(navReducer),
    composeEnhancers(
      applyMiddleware(thunk, middleware),
    ),
  )
);

export default configureStore;
