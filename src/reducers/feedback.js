import { ActionTypes } from '../actions/feedback';

export const initialState = {
  isSubmittingAppFeedback: false,
};

export function feedback(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FEEDBACK_REQUEST:
      return {
        ...state,
        isSubmittingAppFeedback: true,
      };

    case ActionTypes.FEEDBACK_SUCCESS:
      return {
        ...state,
        isSubmittingAppFeedback: false,
      };

    case ActionTypes.FEEDBACK_FAILED:
      return {
        ...state,
        isSubmittingAppFeedback: false,
        err: action.err,
      };

    default:
      return state;
  }
}
