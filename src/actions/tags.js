import apiRoot from '../utils/api.config';

export const ActionTypes = {
  TAGS_FOR_USER_REQUEST: 'TAGS_FOR_USER_REQUEST',
  TAGS_FOR_USER_RECEIVED: 'TAGS_FOR_USER_RECEIVED',

  TAGS_REQUEST: 'TAGS_REQUEST',
  TAGS_RECEIVE: 'TAGS_RECEIVE',

  MY_TAGS_REQUEST: 'MY_TAGS_REQUEST',
  MY_TAGS_RECEIVED: 'MY_TAGS_RECEIVED',

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
    const { tags } = getState();

    if (!tags.isLoadingTags) {
      dispatch(requestTags(ActionTypes.TAGS_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/tags`);

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
