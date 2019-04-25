import apiRoot from '../utils/api.config';
import { refreshMyInformation } from './refresh';
import { fetchUserInformation } from './users';
import { NavigationActions } from 'react-navigation';

export const ActionTypes = {
  TAGS_FOR_USER_REQUEST: 'TAGS_FOR_USER_REQUEST',
  TAGS_FOR_USER_RECEIVED: 'TAGS_FOR_USER_RECEIVED',

  TAGS_REQUEST: 'TAGS_REQUEST',
  TAGS_RECEIVE: 'TAGS_RECEIVE',

  MY_TAGS_REQUEST: 'MY_TAGS_REQUEST',
  MY_TAGS_RECEIVED: 'MY_TAGS_RECEIVED',

  UPDATE_MY_TAGS_REQUEST: 'UPDATE_MY_TAGS_REQUEST',
  UPDATE_MY_TAGS_DONE: 'UPDATE_MY_TAGS_DONE',

  TAGS_FAILED: 'TAGS_FAILED',
};

export function requestTags(type) {
  return {
    type,
  };
}

export function receiveTags(tags) {
  return {
    type: ActionTypes.TAGS_RECEIVE,
    tags,
  };
}

export function receiveUserTags(userTags, myProfile) {
  return {
    type: myProfile
      ? ActionTypes.MY_TAGS_RECEIVED
      : ActionTypes.TAGS_FOR_USER_RECEIVED,
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

export function fetchTags() {
  return async (dispatch, getState) => {
    const { tags, auth } = getState();

    if (!tags.isLoadingTags) {
      dispatch(requestTags(ActionTypes.TAGS_REQUEST));
      try {
        let resp;
        if (auth.isAuthenticated) {
          resp = await fetch(`${apiRoot}/ownTags`, {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${auth.data.token}` },
          });
        } else {
          resp = await fetch(`${apiRoot}/tags`);
        }

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveTags(data));
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
      dispatch(
        requestTags(
          userId
            ? ActionTypes.TAGS_FOR_USER_REQUEST
            : ActionTypes.MY_TAGS_REQUEST,
        ),
      );
      try {
        const resp = await fetch(
          `${apiRoot}/tagsForUser?userId=${
            userId ? userId : auth.data.decoded.id
          }`,
          {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${auth.data.token}` },
          },
        );

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveUserTags(data, !userId));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestTags());
      }
    }
  };
}

export function updateUserTags() {
  return async (dispatch, getState) => {
    const { tags, form, auth } = getState();

    if (!tags.isUpdatingTags) {
      try {
        const resp = await fetch(`${apiRoot}/userTags/update`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.data.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.updateMatchingInformation.values),
        });

        if (resp.ok) {
          dispatch(requestTags(ActionTypes.UPDATE_MY_TAGS_DONE));
          dispatch(refreshMyInformation());
          dispatch(NavigationActions.back());
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestTags());
      }
    }
  };
}

const deleteUserUnseenTags = () => (dispatch, getState) => {
  const { auth } = getState();
  return fetch(`${apiRoot}/userSeenTags`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${auth.data.token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const userSeenTags = () => async dispatch => {
  await dispatch(deleteUserUnseenTags());
  dispatch(fetchUserInformation());
};
