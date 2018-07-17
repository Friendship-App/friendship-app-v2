import apiRoot from '../utils/api.config';
import { NavigationActions, StackActions } from 'react-navigation';

export const ActionTypes = {
  EVENTS_REQUEST_FAILED: 'EVENTS_REQUEST_FAILED',

  EVENTS_REQUEST: 'EVENTS_REQUEST',
  EVENTS_RECEIVED: 'EVENTS_RECEIVED',

  EVENTS_DETAILS_REQUEST: 'EVENTS_DETAILS_REQUEST',
  EVENTS_DETAILS_RECEIVED: 'EVENTS_DETAILS_RECEIVED',

  EVENTS_PARTICIPANTS_REQUEST: 'EVENTS_PARTICIPANTS_REQUEST',
  EVENTS_PARTICIPANTS_RECEIVED: 'EVENTS_PARTICIPANTS_RECEIVED',

  CREATE_EVENT: 'CREATE_EVENT',
  EVENT_CREATED: 'EVENT_CREATED',
};

export function requestEvents(type) {
  return {
    type,
  };
}

export function requestCreateEvent() {
  return {
    type: ActionTypes.CREATE_EVENT,
  };
}

export function eventCreated() {
  return {
    type: ActionTypes.EVENT_CREATED,
  };
}

export function eventDetailsFetched(eventDetails) {
  return {
    type: ActionTypes.EVENTS_DETAILS_RECEIVED,
    eventDetails,
  };
}

export function eventParticipantsFetched(eventParticipants) {
  return {
    type: ActionTypes.EVENTS_PARTICIPANTS_RECEIVED,
    eventParticipants,
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
      dispatch(requestEvents(ActionTypes.EVENTS_REQUEST));
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

export function createEvent(eventForm) {
  return async (dispatch, getState) => {
    const { events, auth } = getState();

    if (!events.isCreatingEvent) {
      dispatch(requestCreateEvent());
      try {
        const resp = await fetch(`${apiRoot}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
          body: JSON.stringify({
            ...eventForm,
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(eventCreated());
          dispatch(fetchEventDetails(data.id));
          dispatch(
            StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({
                  routeName: 'EventDetails',
                  params: { userParticipate: true },
                }),
              ],
            }),
          );
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}

export function fetchEventDetails(eventId) {
  return async (dispatch, getState) => {
    const { events, auth } = getState();

    if (!events.isLoadingEventDetails) {
      dispatch(requestEvents(ActionTypes.EVENTS_DETAILS_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/events/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(eventDetailsFetched(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}

export function fetchEventParticipants(eventId) {
  return async (dispatch, getState) => {
    const { events, auth } = getState();

    if (!events.isLoadingEventDetails) {
      dispatch(requestEvents(ActionTypes.EVENTS_PARTICIPANTS_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/events/participants/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(eventParticipantsFetched(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}
