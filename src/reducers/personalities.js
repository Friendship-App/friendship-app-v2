import { ActionTypes } from '../actions/personalities';

export const initialState = {
  isLoading: false,
  isLoadingMyPersonalities: false,
  isUpdatingPersonalities: false,
  personalitiesList: [],
};

export default function personalities(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PERSONALITIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.PERSONALITIES_RECEIVE:
      return {
        ...state,
        personalitiesList: action.personalitiesList,
        isLoading: false,
      };

    case ActionTypes.USER_PERSONALITIES_RECEIVED:
      return {
        ...state,
        userPersonalities: action.personalitiesList,
        isLoading: false,
      };

    case ActionTypes.MY_PERSONALITIES_REQUEST:
      return {
        ...state,
        isLoadingMyPersonalities: true,
      };

    case ActionTypes.MY_PERSONALITIES_RECEIVED:
      return {
        ...state,
        isLoadingMyPersonalities: false,
        myPersonalities: action.personalitiesList,
      };

    case ActionTypes.PERSONALITIES_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoadingMyPersonalities: false,
        isUpdatingPersonalities: false,
      };

    case ActionTypes.UPDATE_MY_PERSONALITIES_REQUEST:
      return {
        ...state,
        isUpdatingPersonalities: true,
      };

    case ActionTypes.UPDATE_MY_PERSONALITIES_DONE:
      return {
        ...state,
        isUpdatingPersonalities: false,
      };

    case 'SIGN_OUT':
      return initialState;

    default:
      return state;
  }
}
