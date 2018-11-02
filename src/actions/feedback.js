import apiRoot from '../utils/api.config';
import { NavigationActions } from 'react-navigation';

export const ActionTypes = {
  FEEDBACK_REQUEST: 'FEEDBACK_REQUEST',
  FEEDBACK_SUCCESS: 'FEEDBACK_SUCCESS',
  FEEDBACK_FAILED: 'FEEDBACK_FAILED',
};

export function requestFeedback(type) {
  return {
    type,
  };
}

export function failAppFeedback(err) {
  return {
    type: ActionTypes.FEEDBACK_FAILED,
    err,
  };
}

export function sendAppFeedback(text) {
  return async (dispatch, getState) => {
    const { auth, feedback } = getState();
    if (!feedback.isSubmittingAppFeedback) {
      dispatch(requestFeedback(ActionTypes.FEEDBACK_REQUEST));

      try {
        const resp = await fetch(`${apiRoot}/feedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
          body: JSON.stringify({ feedback: text }),
        });

        if (resp.ok) {
          dispatch(requestFeedback(ActionTypes.FEEDBACK_SUCCESS));
          dispatch(NavigationActions.back());
        } else {
          throw Error;
        }
      } catch (err) {
        console.log(err);
        dispatch(failAppFeedback(err));
      }
    }
  };
}
