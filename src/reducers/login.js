import {ActionTypes} from '../actions/login';

export const initialState = {
  isLogging: false,
  error: ''
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
      };

    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };

    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isAuthenticating: false,
        error: action.errorMessage,
      };

    default:
      return state;
  }
}
