import {ActionTypes} from "../actions/auth";

export const initialState = {
  isAuthenticated: false,
  data: {}
};

export default function auth (state = initialState, action) {
  switch(action.type) {
    case ActionTypes.STORE_CREDENTIALS:
      return {
        ...state,
        data: action.credentials
      };

    default:
      return state;
  }
}