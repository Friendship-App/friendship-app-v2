import { ActionTypes } from '../actions/register';

export const initialState = {
  isRegistering: false,
  checkingUsername: false,
  checkingEmail: false,
};

export default function register(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true,
      };

    case ActionTypes.REGISTER_RECEIVE:
      return {
        ...state,
        isRegistering: false,
      };

    case ActionTypes.CHECK_USERNAME:
      return {
        ...state,
        checkingUsername: true,
      };

    case ActionTypes.CHECK_EMAIL:
      return {
        ...state,
        checkingEmail: true,
      };

    case ActionTypes.USERNAME_CHECKED:
      return {
        ...state,
        checkingUsername: false,
      };

    case ActionTypes.EMAIL_CHECKED:
      return {
        ...state,
        checkingEmail: false,
      };

    case ActionTypes.REGISTER_FAIL:
      return {
        ...state,
        isRegistering: false,
        checkingUsername: false,
        checkingEmail: false,
      };

    default:
      return state;
  }
}
