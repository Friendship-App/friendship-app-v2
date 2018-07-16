import { ActionTypes } from '../actions/personalities';

export const initialState = {
  isLoading: false,
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
        isLoading: false,
      };

    case ActionTypes.PERSONALITIES_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
