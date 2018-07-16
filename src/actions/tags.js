import apiRoot from '../utils/api.config';
import {
  failRequestUsers,
  receiveUserInformation,
  requestUsers,
} from './users';

export const ActionTypes = {
  TAGS_FOR_USER_REQUEST: 'TAGS_FOR_USER_REQUEST',
  TAGS_FOR_USER_RECEIVED: 'TAGS_FOR_USER_RECEIVED',
  ACTIVITIES_REQUEST: 'ACTIVITIES_REQUEST',
  INTERESTS_REQUEST: 'INTERESTS_REQUEST',
  ACTIVITIES_RECEIVE: 'ACTIVITIES_RECEIVE',
  INTERESTS_RECEIVE: 'INTERESTS_RECEIVE',
  TAGS_FAILED: 'TAGS_FAILED',
};

export function requestTags(type) {
  return {
    type,
  };
}

export function receiveActivities(activitiesList) {
  return {
    type: ActionTypes.ACTIVITIES_RECEIVE,
    activitiesList,
  };
}

export function receiveInterests(interestsList) {
  return {
    type: ActionTypes.INTERESTS_RECEIVE,
    interestsList,
  };
}

export function receiveUserTags(userTags) {
  return {
    type: ActionTypes.TAGS_FOR_USER_RECEIVED,
    userTags,
  };
}

export function failRequestTags() {
  return async dispatch => {
    dispatch({
      type: ActionTypes.TAGS_FAILED,
    });
  };
}

export function fetchTags(type = ActionTypes.ACTIVITIES_REQUEST) {
  const endpoint =
    type === ActionTypes.ACTIVITIES_REQUEST ? 'activities' : 'interests';

  return async (dispatch, getState) => {
    const { tags } = getState();

    if (!tags.isLoading) {
      dispatch(requestTags(type));
      try {
        const resp = await fetch(`${apiRoot}/tags/${endpoint}`);

        if (resp.ok) {
          const data = await resp.json();
          dispatch(
            type === ActionTypes.ACTIVITIES_REQUEST
              ? receiveActivities(data)
              : receiveInterests(data),
          );
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestTags());
      }
    }
  };
}

export function fetchUserTags(userId) {
  return async (dispatch, getState) => {
    const { auth, tags } = getState();

    if (!tags.isLoading) {
      dispatch(requestTags(ActionTypes.TAGS_FOR_USER_REQUEST));
      try {
        const resp = await fetch(
          `${apiRoot}/tags?userId=${userId ? userId : auth.data.decoded.id}`,
          {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${auth.data.token}` },
          },
        );

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveUserTags(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}
