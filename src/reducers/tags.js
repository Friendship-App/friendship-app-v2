import { ActionTypes } from '../actions/tags';

export const initialState = {
  isLoadingTags: false,
  isLoading: false,
  isLoadingMyTags: false,
  tagsList: [],
};

export default function tags(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.TAGS_REQUEST:
      return {
        ...state,
        isLoadingTags: true,
      };

    case ActionTypes.TAGS_FOR_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.TAGS_RECEIVE:
      return {
        ...state,
        tagsList: action.tags,
        isLoadingTags: false,
      };

    case ActionTypes.TAGS_FOR_USER_RECEIVED:
      return {
        ...state,
        userTags: action.userTags,
        isLoading: false,
      };

    case ActionTypes.TAGS_FAILED:
      return {
        ...state,
        isLoadingActivities: false,
        isLoadingInterests: false,
      };

    case ActionTypes.MY_TAGS_REQUEST:
      return {
        ...state,
        isLoadingMyTags: true,
      };

    case ActionTypes.MY_TAGS_RECEIVED:
      return {
        ...state,
        isLoadingMyTags: false,
        myTags: action.userTags,
      };

    default:
      return state;
  }
}
