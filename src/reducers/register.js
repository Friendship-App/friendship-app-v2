import {ActionTypes} from '../actions/register';

export const initialState = {
  isRegistering: false,
};

export default function register(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true,
      };

    case ActionTypes.REGISTER_RECEIVE:
      return {
        ...state,
        isRegistering: false,
      };

    case ActionTypes.REGISTER_FAIL:
      return {
        ...state,
        isRegistering: false,
      };

    default:
      return state;
  }
}
