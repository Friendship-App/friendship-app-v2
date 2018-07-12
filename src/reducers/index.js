import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import locations from "./locations";
import avatars from "./avatars";
import users from "./users";
import personalities from "./personalities";

const rootReducer = navReducer => (
  combineReducers({
    nav: navReducer,
    form: formReducer,
    locations,
    avatars,
    users,
    personalities
  })
);

export default rootReducer;