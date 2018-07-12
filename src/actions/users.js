import apiRoot from "../utils/api.config";

export const ActionTypes = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_RECEIVE: 'USERS_RECEIVE',
  USERS_FAILED: 'USERS_FAILED',
  USERS_CHECK_USERNAME: 'USERS_CHECK_USERNAME',
  USERS_VALIDATE_USERNAME: 'USERS_VALIDATE_USERNAME',
  USERS_USERNAME_CHECKED: 'USERS_USERNAME_CHECKED',
  USERS_CHECK_EMAIL: 'USERS_CHECK_EMAIL',
  USERS_VALIDATE_EMAIL: 'USERS_VALIDATE_EMAIL',
  USERS_EMAIL_CHECKED: 'USERS_EMAIL_CHECKED',
};

export function requestUsers() {
  return {
    type: ActionTypes.USERS_REQUEST,
  };
}

export function checkUsername() {
  return {
    type: ActionTypes.USERS_CHECK_USERNAME,
  };
}

export function checkEmail() {
  return {
    type: ActionTypes.USERS_CHECK_EMAIL,
  };
}

export function usernameChecked() {
  return {
    type: ActionTypes.USERS_USERNAME_CHECKED,
  };
}

export function emailChecked() {
  return {
    type: ActionTypes.USERS_USERNAME_CHECKED,
  };
}

export function receiveUsers(locationsList) {
  return {
    type: ActionTypes.USERS_RECEIVE,
    locationsList,
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
    const { users } = getState();

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

export function validateUsername(username) {
  return async (dispatch, getState) => {
    const { users } = getState();

    if (!users.checkingUsername) {
      dispatch(checkUsername());
      try {
        const resp = await fetch(`${apiRoot}/users/validate/username?username=${username.toLowerCase()}`);

        if (resp.ok) {
          dispatch(usernameChecked());
          return await resp.json();
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}

export function validateEmail(email) {
  return async (dispatch, getState) => {
    const { users } = getState();

    if (!users.checkingEmail) {
      dispatch(checkEmail());
      try {
        const resp = await fetch(`${apiRoot}/users/validate/email?email=${email.toLowerCase()}`);

        if (resp.ok) {
          dispatch(emailChecked());
          return await resp.json();
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestUsers());
      }
    }
  };
}