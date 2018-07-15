import {ActionTypes} from '../actions/register';

export const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  credentials: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        credentials: action.credentials,
        isAuthenticated: true,
        isAuthenticating: false,
      };

    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: true,
      };

    default:
      return state;
  }
}
