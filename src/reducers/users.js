import { ActionTypes } from '../actions/users';

export const initialState = {
  isLoading: false,
  isLoadingUserInformation: false,
  isUpdatingProfile: false,
  isUpdatingAccount: false,
  isReporting: false,
  isDeleting: false,
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

    case ActionTypes.REPORT_USER_REQUEST:
      return {
        ...state,
        isReporting: true,
      };

    case ActionTypes.REPORT_USER_DONE:
      return {
        ...state,
        isReporting: false,
      };

    case ActionTypes.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };

    case ActionTypes.DELETE_ACCOUNT_DONE:
      return {
        ...state,
        isDeleting: false,
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
