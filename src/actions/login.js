import apiRoot from '../utils/api.config';
import { NavigationActions, StackActions } from 'react-navigation';
import { storeCredentials } from './auth';
import jwtDecode from 'jwt-decode';
import { fetchBatchUsers, fetchUserInformation } from './users';
import { fetchChatrooms } from './chatrooms';
import { fetchEvents } from './events';
import { fetchUserTags } from './tags';
import { fetchUserPersonalities } from './personalities';
import { refresh, refreshMyInformation } from './refresh';
import { registerForPushNotificationsAsync } from '../utils/notifications';

export const ActionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',

  SIGN_OUT: 'SIGN_OUT',
};

export function requestLogin() {
  return {
    type: ActionTypes.LOGIN_REQUEST,
  };
}

export function receiveLogin() {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
  };
}

export function failLogin(errorMessage) {
  return {
    type: ActionTypes.LOGIN_FAILED,
    errorMessage,
  };
}

export function receiveLogOut() {
  return {
    type: ActionTypes.SIGN_OUT,
  };
}

export function logOut() {
  return async (dispatch, getState) => {
    dispatch(receiveLogOut());
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'WelcomeScreen' })],
        key: null,
      }),
    );
  };
}

export function login(email, password, screenName) {
  return async (dispatch, getState) => {
    try {
      dispatch(requestLogin());
      const resp = await fetch(`${apiRoot}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}&password=${password}`,
        credentials: 'same-origin',
      });

      if (resp.ok) {
        const data = await resp.json();
        const decodedData = jwtDecode(data.token);
        await dispatch(receiveLogin());
        await dispatch(
          storeCredentials({
            ...data,
            decoded: decodedData,
          }),
        );
        dispatch(refresh());
        dispatch(refreshMyInformation());
        registerForPushNotificationsAsync(decodedData.id, data.token);

        if (screenName) {
          dispatch(NavigationActions.navigate({ routeName: screenName }));
        } else {
          dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Home',
                }),
              ],
            }),
          );
        }
      } else {
        const err = await resp.json();
        throw Error(err.message);
      }
    } catch (e) {
      dispatch(failLogin(e.message));
    }
  };
}
