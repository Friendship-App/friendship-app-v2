import { ActionTypes } from '../actions/tags';

export const initialState = {
  isLoadingActivities: false,
  isLoadingInterests: false,
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
