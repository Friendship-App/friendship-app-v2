import apiRoot from '../utils/api.config';
import { NavigationActions } from 'react-navigation';

export const ActionTypes = {
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_RECEIVE: 'REGISTER_RECEIVE',
  REGISTER_FAIL: 'REGISTER_FAIL',

  CHECK_USERNAME: 'CHECK_USERNAME',
  USERNAME_CHECKED: 'USERNAME_CHECKED',

  CHECK_EMAIL: 'CHECK_EMAIL',
  EMAIL_CHECKED: 'EMAIL_CHECKED',
};

export function requestRegister(type) {
  return {
    type,
  };
}

export function receiveRegister(credentials) {
  return {
    type: ActionTypes.REGISTER_RECEIVE,
    isRegistering: true,
    credentials,
  };
}

export function failRegister() {
  return {
    type: ActionTypes.REGISTER_FAIL,
  };
}

export function register() {
  return async (dispatch, getState) => {
    const registrationData = getState().form.register.values;
    const state = getState().register;

    if (!state.isRegistering) {
      dispatch(requestRegister(ActionTypes.REGISTER_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...registrationData,
            scope: 'user',
          }),
        });

        if (resp.ok) {
          dispatch(receiveRegister());
          dispatch(NavigationActions.navigate({ routeName: 'Registered' }));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRegister());
      }
    }
  };
}

export function validateUsername(username) {
  return async (dispatch, getState) => {
    const { register } = getState();

    if (!register.checkingUsername) {
      dispatch(requestRegister(ActionTypes.CHECK_USERNAME));
      try {
        const resp = await fetch(
          `${apiRoot}/register/validate?username=${username.toLowerCase()}`,
        );

        if (resp.ok) {
          dispatch(requestRegister(ActionTypes.USERNAME_CHECKED));
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
    const { register } = getState();

    if (!register.checkingEmail) {
      dispatch(requestRegister(ActionTypes.CHECK_EMAIL));
      try {
        const resp = await fetch(
          `${apiRoot}/register/validate?email=${email.toLowerCase()}`,
        );

        if (resp.ok) {
          dispatch(requestRegister(ActionTypes.EMAIL_CHECKED));
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
