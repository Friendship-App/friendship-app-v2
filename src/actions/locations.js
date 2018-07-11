import apiRoot from "../utils/api.config";

export const ActionTypes = {
  LOCATIONS_REQUEST: 'LOCATIONS_REQUEST',
  LOCATIONS_RECEIVE: 'LOCATIONS_RECEIVE',
  LOCATIONS_FAILED: 'LOCATIONS_FAILED',
};

export function requestLocations() {
  return {
    type: ActionTypes.LOCATIONS_REQUEST,
  };
}

export function receiveLocations(locationsList) {
  return {
    type: ActionTypes.LOCATIONS_RECEIVE,
    locationsList,
  };
}

export function failRequestLocations() {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.LOCATIONS_FAILED,
    });
  };
}

export function fetchLocations() {
  return async (dispatch, getState) => {
    const { locations } = getState();

    if (!locations.isLoading) {
      dispatch(requestLocations());
      try {
        const resp = await fetch(`${apiRoot}/locations`);

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveLocations(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestLocations());
      }
    }
  };
}