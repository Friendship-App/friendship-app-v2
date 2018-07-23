import { ActionTypes } from '../actions/users';

export const initialState = {
  isLoading: false,
  isLoadingUserInformation: false,
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

    case ActionTypes.USER_INFORMATION_REQUEST:
      return {
        ...state,
        isLoadingUserInformation: true,
      };

    case ActionTypes.USER_INFORMATION_RECEIVED:
      return action.myProfile
        ? {
            ...state,
            myDetails: { data: action.userDetails },
            isLoadingUserInformation: false,
          }
        : {
            ...state,
            userDetails: { data: action.userDetails },
            isLoadingUserInformation: false,
          };

    case 'SIGN_OUT':
      return initialState;

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
