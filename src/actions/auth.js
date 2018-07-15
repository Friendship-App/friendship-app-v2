import apiRoot from "../utils/api.config";
import {NavigationActions, StackActions} from 'react-navigation';

export const ActionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
};

export function requestLogin() {
  return {
    type: ActionTypes.LOGIN_REQUEST,
  };
}

export function receiveLogin(credentials) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    credentials
  };
}

export function failLogin() {
  return {
    type: ActionTypes.LOGIN_FAILED,
  };
}

export function login(username, password, screenName) {
  return async (dispatch, getState) => {
    try {
      dispatch(requestLogin());
      const resp = await fetch(`${apiRoot}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
        credentials: 'same-origin',
      });

      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        dispatch(receiveLogin(data));

        if (screenName) {
          dispatch(NavigationActions.navigate({routeName: screenName}));
        } else {
          dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'Home',
              }),
            ],
          }));
        }
      } else {
        throw Error;
      }
    } catch (e) {
      dispatch(failLogin());
    }
  };
}