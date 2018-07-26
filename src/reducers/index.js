import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import locations from './locations';
import moods from './moods';
import users from './users';
import personalities from './personalities';
import tags from './tags';
import register from './register';
import login from './login';
import auth from './auth';
import chatrooms from './chatrooms';
import { events } from './events';

const rootReducer = navReducer =>
  combineReducers({
    nav: navReducer,
    auth,
    login,
    users,
    register,
    form: formReducer,
    locations,
    moods,
    personalities,
    tags,
    chatrooms,
    events,
  });

export default rootReducer;
