import { ActionTypes } from '../actions/tags';

export const initialState = {
  isLoadingActivities: false,
  isLoadingInterests: false,
  isLoading: false,
  activitiesList: [],
  interestsList: [],
};

export default function tags(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ACTIVITIES_REQUEST:
      return {
        ...state,
        isLoadingActivities: true,
      };

      case ActionTypes.INTERESTS_REQUEST:
      return {
        ...state,
        isLoadingInterests: true,
      };

      case ActionTypes.TAGS_FOR_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.ACTIVITIES_RECEIVE:
      return {
        ...state,
        activitiesList: action.activitiesList,
        isLoadingActivities: false,
      };

      case ActionTypes.INTERESTS_RECEIVE:
      return {
        ...state,
        interestsList: action.interestsList,
        isLoadingInterests: false,
      };

    case ActionTypes.TAGS_FOR_USER_RECEIVED:
      return {
        ...state,
        userTags: action.userTags,
        isLoading: false
      };

    case ActionTypes.TAGS_FAILED:
      return {
        ...state,
        isLoadingActivities: false,
        isLoadingInterests: false,
      };

    default:
      return state;
  }
}
