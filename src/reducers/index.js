import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import locations from "./locations";
import avatars from "./avatars";

const rootReducer = navReducer => (
  combineReducers({
    nav: navReducer,
    form: formReducer,
    locations,
    avatars
  })
);

export default rootReducer;