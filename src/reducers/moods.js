import { ActionTypes } from '../actions/moods';

export const initialState = {
  isLoading: false,
  moodsList: [],
};

export default function moods(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MOODS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.MOODS_RECEIVE:
      return {
        ...state,
        moodsList: action.moodsList,
        isLoading: false,
      };

    case ActionTypes.MOODS_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
