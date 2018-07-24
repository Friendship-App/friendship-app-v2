import { ActionTypes } from '../actions/locations';

export const initialState = {
  isLoading: false,
  locationsList: [],
};

export default function locations(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOCATIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.LOCATIONS_RECEIVE:
      return {
        ...state,
        locationsList: action.locationsList,
        isLoading: false,
      };

    case ActionTypes.LOCATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
