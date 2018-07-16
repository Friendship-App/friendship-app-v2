import apiRoot from "../utils/api.config";
import {login} from "./login";

export const ActionTypes = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_RECEIVE: 'REGISTER_RECEIVE',
  REGISTER_FAIL: 'REGISTER_FAIL',

  CHECK_USERNAME: 'CHECK_USERNAME',
  USERNAME_CHECKED: 'USERNAME_CHECKED',

  CHECK_EMAIL: 'CHECK_EMAIL',
  EMAIL_CHECKED: 'EMAIL_CHECKED',
};

export function requestRegister() {
  return {
    type: ActionTypes.REGISTER_REQUEST,
    isRegistering: true
  };
}

export function receiveRegister(credentials) {
  return {
    type: ActionTypes.REGISTER_RECEIVE,
    isRegistering: true,
    credentials
  };
}

export function failRegister() {
  return {
    type: ActionTypes.REGISTER_FAIL,
    isRegistering: false,
  };
}

export function checkUsername() {
  return {
    type: ActionTypes.CHECK_USERNAME,
  };
}

export function checkEmail() {
  return {
    type: ActionTypes.CHECK_EMAIL,
  };
}

export function usernameChecked() {
  return {
    type: ActionTypes.USERNAME_CHECKED,
  };
}

export function emailChecked() {
  return {
    type: ActionTypes.EMAIL_CHECKED,
  };
}

export function register() {
  return async (dispatch, getState) => {
    const registrationData = getState().form.register.values;
    const state = getState().register;

    if (!state.isRegistering) {
      dispatch(requestRegister());
      try {
        const resp = await fetch(`${apiRoot}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...registrationData,
            scope: 'user'
          }),
        });

        if (resp.ok) {
          dispatch(receiveRegister());
          dispatch(login(
            registrationData.username,
            registrationData.password,
            'Registered'
          ));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRegister());
      }
    }
  }
}

export function validateUsername(username) {
  return async (dispatch, getState) => {
    const {users} = getState();

    if (!users.checkingUsername) {
      dispatch(checkUsername());
      try {
        const resp = await fetch(`${apiRoot}/register/validate?username=${username.toLowerCase()}`);

        if (resp.ok) {
          dispatch(usernameChecked());
          return await resp.json();
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRegister());
      }
    }
  };
}

export function validateEmail(email) {
  return async (dispatch, getState) => {
    const {users} = getState();

    if (!users.checkingEmail) {
      dispatch(checkEmail());
      try {
        const resp = await fetch(`${apiRoot}/register/validate?email=${email.toLowerCase()}`);

        if (resp.ok) {
          dispatch(emailChecked());
          return await resp.json();
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRegister());
      }
    }
  };
}