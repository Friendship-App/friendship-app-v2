import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import locations from "./locations";

const rootReducer = navReducer => (
  combineReducers({
    nav: navReducer,
    form: formReducer,
    locations
  })
);

export default rootReducer;