import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import locations from "./locations";
import avatars from "./avatars";
import users from "./users";
import personalities from "./personalities";
import tags from "./tags";
import register from "./register";
import auth from "./auth";

const rootReducer = navReducer => (
  combineReducers({
    nav: navReducer,
    auth,
    users,
    register,
    form: formReducer,
    locations,
    avatars,
    personalities,
    tags
  })
);

export default rootReducer;