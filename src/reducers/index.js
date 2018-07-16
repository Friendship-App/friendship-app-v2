import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import locations from "./locations";
import avatars from "./avatars";
import users from "./users";
import personalities from "./personalities";
import tags from "./tags";
import register from "./register";
import login from "./login";
import auth from "./auth";
import chatrooms from "./chatrooms";

const rootReducer = navReducer => (
  combineReducers({
    nav: navReducer,
    auth,
    login,
    users,
    register,
    form: formReducer,
    locations,
    avatars,
    personalities,
    tags,
    chatrooms
  })
);

export default rootReducer;