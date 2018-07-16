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
        isLogging: false,
      };

    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLogging: true,
      };

    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLogging: false,
        error: action.errorMessage,
      };

    default:
      return state;
  }
}
