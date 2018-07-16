import {ActionTypes} from '../actions/users';

export const initialState = {
  isLoading: false,
  checkingUsername: false,
  checkingEmail: false,
  usersList: [],
  userDetails: {
    userTags: [],
    userPersonalities: [],
    chatroomId: -1,
  }
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
        userDetails : {...state.userDetails, data: action.userDetails},
        isLoading: false,
      };

      case ActionTypes.TAGS_FOR_USER_RECEIVED:
      return {
        ...state,
        userDetails : {...state.userDetails, userTags: action.userTags},
        isLoading: false,
      };

      case ActionTypes.USER_PERSONALITIES_RECEIVED:
      return {
        ...state,
        userDetails : {...state.userDetails, userPersonalities: action.userPersonalities},
        isLoading: false,
      };

      case ActionTypes.USER_CHATROOM_RECEIVED:
      return {
        ...state,
        userDetails : {...state.userDetails, chatroomId: action.chatroomId},
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
