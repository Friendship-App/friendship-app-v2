import apiRoot from '../utils/api.config';

export const ActionTypes = {
  EVENTS_REQUEST_FAILED: 'EVENTS_REQUEST_FAILED',

  EVENTS_REQUEST: 'EVENTS_REQUEST',
  EVENTS_RECEIVED: 'EVENTS_RECEIVED',

  EVENTS_DETAILS_REQUEST: 'EVENTS_DETAILS_REQUEST',
  EVENTS_DETAILS_RECEIVED: 'EVENTS_DETAILS_RECEIVED',
};

export function requestEvents() {
  return {
    type: ActionTypes.EVENTS_REQUEST,
  };
}

export function failEvents() {
  return {
    type: ActionTypes.EVENTS_REQUEST_FAILED,
  };
}

export function receiveEvents(events) {
  return {
    type: ActionTypes.EVENTS_RECEIVED,
    events,
  };
}

export function fetchEvents() {
  return async (dispatch, getState) => {
    const { events, auth } = getState();

    if (!events.isLoading) {
      dispatch(requestEvents());
      try {
        const resp = await fetch(`${apiRoot}/events`, {
          method: 'GET',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${auth.data.token}` },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveEvents(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}
