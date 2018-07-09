import {combineReducers} from 'redux';

const rootReducer = navReducer => (
  combineReducers({
    nav: navReducer
  })
);

export default rootReducer;