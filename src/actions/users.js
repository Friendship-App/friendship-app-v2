import apiRoot from '../utils/api.config';

export const ActionTypes = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_RECEIVED: 'USERS_RECEIVED',

  USER_INFORMATION_REQUEST: 'USER_INFORMATION_REQUEST',
  USER_INFORMATION_RECEIVED: 'USER_INFORMATION_RECEIVED',

  USERS_FAILED: 'USERS_FAILED',
};

export function requestUsers(type) {
  return {
    type,
  };
}

export function receiveUsers(usersList) {
  return {
    type: ActionTypes.USERS_RECEIVED,
    usersList,
  };
}

export function receiveUserInformation(userDetails, myProfile) {
  return {
    type: ActionTypes.USER_INFORMATION_RECEIVED,
    userDetails,
    myProfile,
  };
}

export function failRequestUsers() {
  return async dispatch => {
    dispatch({
      type: ActionTypes.USERS_FAILED,
    });
  };
}

export function fetchBatchUsers(batchNumber) {
  return async (dispatch, getState) => {
    const { auth, users } = getState();

    if (!users.isLoading) {
      dispatch(requestUsers(ActionTypes.USERS_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/users/${batchNumber}`, {
          method: 'GET',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${auth.data.token}` },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveUsers(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}

export function fetchUserInformation(userId) {
  return async (dispatch, getState) => {
    const { auth, users } = getState();

    if (!users.isLoadingUserInformation) {
      dispatch(requestUsers(ActionTypes.USER_INFORMATION_REQUEST));
      try {
        const resp = await fetch(
          `${apiRoot}/users?userId=${userId ? userId : auth.data.decoded.id}`,
          {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${auth.data.token}` },
          },
        );

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveUserInformation(data, !userId));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}
