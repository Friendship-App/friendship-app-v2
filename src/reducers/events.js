import { ActionTypes } from '../actions/events';

export const initialState = {
  isLoading: false,
  isLoadingEventDetails: false,
  isLoadingEventParticipants: false,
  isCreatingEvent: false,
  isAddingUserToEvent: false,
  isRemovingUserFromEvent: false,
  isUpdatingEvent: false,
  isDeletingEvent: false,
  isReporting: false,
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
        isAddingUserToEvent: false,
        isRemovingUserFromEvent: false,
        isUpdatingEvent: false,
        isDeletingEvent: false,
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

    case ActionTypes.JOIN_EVENT_REQUEST:
      return {
        ...state,
        isAddingUserToEvent: true,
      };

    case ActionTypes.JOIN_EVENT_DONE:
      return {
        ...state,
        isAddingUserToEvent: false,
      };

    case ActionTypes.LEAVE_EVENT_REQUEST:
      return {
        ...state,
        isRemovingUserFromEvent: true,
      };

    case ActionTypes.LEAVE_EVENT_DONE:
      return {
        ...state,
        isRemovingUserFromEvent: false,
      };

    case ActionTypes.UPDATE_EVENT:
      return {
        ...state,
        isUpdatingEvent: true,
      };

    case ActionTypes.EVENT_UPDATED:
      return {
        ...state,
        isUpdatingEvent: false,
      };

    case ActionTypes.DELETE_EVENT:
      return {
        ...state,
        isDeletingEvent: true,
      };

    case ActionTypes.EVENT_DELETED:
      return {
        ...state,
        isDeletingEvent: false,
      };
    case ActionTypes.REPORT_EVENT_DONE:
      return {
        ...state,
        isReporting: false,
      };
    case ActionTypes.REPORT_EVENT_REQUEST:
      return {
        ...state,
        isReporting: true,
      };

    case 'SIGN_OUT':
      return initialState;

    default:
      return state;
  }
}
