import {ActionTypes} from '../actions/users';

export const initialState = {
  isLoading: false,
  checkingUsername: false,
  checkingEmail: false,
  usersList: [],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.USERS_RECEIVE:
      return {
        ...state,
        usersList: action.usersList,
        isLoading: false,
      };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.CHECK_USERNAME:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.CHECK_EMAIL:
      return {
        ...state,
        isLoading: true,
      };

      case ActionTypes.USERNAME_CHECKED:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.EMAIL_CHECKED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
