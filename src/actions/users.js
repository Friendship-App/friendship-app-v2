import apiRoot from "../utils/api.config";

export const ActionTypes = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_RECEIVE: 'USERS_RECEIVE',
  USERS_FAILED: 'USERS_FAILED',
};

export function requestUsers() {
  return {
    type: ActionTypes.USERS_REQUEST,
  };
}

export function receiveUsers(usersList) {
  return {
    type: ActionTypes.USERS_RECEIVE,
    usersList,
  };
}

export function failRequestUsers() {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.USERS_FAILED,
    });
  };
}

export function fetchUsers() {
  return async (dispatch, getState) => {
    const {users} = getState();

    if (!users.isLoading) {
      dispatch(requestUsers());
      try {
        const resp = await fetch(`${apiRoot}/users`);

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