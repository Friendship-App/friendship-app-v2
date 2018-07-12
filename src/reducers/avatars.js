import { ActionTypes } from '../actions/avatars';

export const initialState = {
  isLoading: false,
  avatarsList: [],
};

export default function avatars(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AVATARS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.AVATARS_RECEIVE:
      return {
        ...state,
        avatarsList: action.avatarsList,
        isLoading: false,
      };

    case ActionTypes.AVATARS_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
