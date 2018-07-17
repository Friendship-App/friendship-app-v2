import apiRoot from '../utils/api.config';

export const ActionTypes = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_RECEIVED: 'USERS_RECEIVED',
  USER_INFORMATION_RECEIVED: 'USER_INFORMATION_RECEIVED',
  USERS_FAILED: 'USERS_FAILED',

  MY_DETAILS_REQUEST: 'MY_DETAILS_REQUEST',
  MY_DETAILS_RECEIVED: 'MY_DETAILS_RECEIVED',
};

export function requestUsers() {
  return {
    type: ActionTypes.USERS_REQUEST,
  };
}

export function requestMyDetails() {
  return {
    type: ActionTypes.MY_DETAILS_REQUEST,
  };
}

export function receiveUsers(usersList) {
  return {
    type: ActionTypes.USERS_RECEIVED,
    usersList,
  };
}

export function receiveMyDetails(myDetails) {
  return {
    type: ActionTypes.MY_DETAILS_RECEIVED,
    myDetails,
  };
}

export function receiveUserInformation(userDetails) {
  return {
    type: ActionTypes.USER_INFORMATION_RECEIVED,
    userDetails,
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
      dispatch(requestUsers());
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

    if (!users.isLoading) {
      userId ? dispatch(requestUsers()) : dispatch(requestMyDetails());
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
          userId
            ? dispatch(receiveUserInformation(data))
            : dispatch(receiveMyDetails(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}
