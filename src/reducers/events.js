import { ActionTypes } from '../actions/events';

export const initialState = {
  isLoading: false,
  isLoadingEventDetails: false,
  isLoadingEventParticipants: false,
  isCreatingEvent: false,
  events: [],
};

export function events(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.EVENTS_RECEIVED:
      return {
        ...state,
        events: action.events,
        isLoading: false,
      };

    case ActionTypes.EVENTS_DETAILS_REQUEST:
      return {
        ...state,
        isLoadingEventDetails: true,
      };

    case ActionTypes.EVENTS_DETAILS_RECEIVED:
      return {
        ...state,
        eventDetails: action.eventDetails,
        isLoadingEventDetails: false,
      };

    case ActionTypes.EVENTS_PARTICIPANTS_REQUEST:
      return {
        ...state,
        isLoadingEventParticipants: true,
      };

    case ActionTypes.EVENTS_PARTICIPANTS_RECEIVED:
      return {
        ...state,
        eventParticipants: action.eventParticipants,
        isLoadingEventParticipants: false,
      };

    case ActionTypes.EVENTS_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoadingEventDetails: false,
        isLoadingEventParticipants: false,
        isCreatingEvent: false,
      };

    case ActionTypes.CREATE_EVENT:
      return {
        ...state,
        isCreatingEvent: true,
      };

    case ActionTypes.EVENT_CREATED:
      return {
        ...state,
        isCreatingEvent: false,
      };

    case 'SIGN_OUT':
      return initialState;

    default:
      return state;
  }
}
