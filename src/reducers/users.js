import { ActionTypes } from '../actions/users';

export const initialState = {
  isLoading: false,
  isLoadingMyDetails: false,
  checkingUsername: false,
  checkingEmail: false,
  usersList: [],
  userDetails: {
    userTags: [],
    userPersonalities: [],
    chatroomId: -1,
  },
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.USERS_RECEIVED:
      return {
        ...state,
        usersList: action.usersList,
        isLoading: false,
      };

    case ActionTypes.USER_INFORMATION_RECEIVED:
      return {
        ...state,
        userDetails: { data: action.userDetails },
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

    case ActionTypes.MY_DETAILS_REQUEST:
      return {
        ...state,
        isLoadingMyDetails: true,
      };

    case ActionTypes.MY_DETAILS_RECEIVED:
      return {
        ...state,
        isLoadingMyDetails: false,
        myDetails: { data: action.myDetails },
      };

    default:
      return state;
  }
}
