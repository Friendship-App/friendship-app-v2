import apiRoot from '../utils/api.config';
import { refreshMyInformation } from './refresh';
import { NavigationActions } from 'react-navigation';

export const ActionTypes = {
  PERSONALITIES_REQUEST: 'PERSONALITIES_REQUEST',
  PERSONALITIES_RECEIVE: 'PERSONALITIES_RECEIVE',

  USER_PERSONALITIES_RECEIVED: 'USER_PERSONALITIES_RECEIVED',
  PERSONALITIES_FAILED: 'PERSONALITIES_FAILED',

  MY_PERSONALITIES_REQUEST: 'MY_PERSONALITIES_REQUEST',
  MY_PERSONALITIES_RECEIVED: 'MY_PERSONALITIES_RECEIVED',

  UPDATE_MY_PERSONALITIES_REQUEST: 'UPDATE_MY_PERSONALITIES_REQUEST',
  UPDATE_MY_PERSONALITIES_DONE: 'UPDATE_MY_PERSONALITIES_DONE',
};

export function requestPersonalities(type) {
  return {
    type,
  };
}

export function receivePersonalities(personalitiesList, myProfile) {
  return {
    type: myProfile
      ? ActionTypes.MY_PERSONALITIES_RECEIVED
      : ActionTypes.PERSONALITIES_RECEIVE,
    personalitiesList,
    myProfile,
  };
}

export function failRequestPersonalities() {
  return async dispatch => {
    dispatch({
      type: ActionTypes.PERSONALITIES_FAILED,
    });
  };
}

export function fetchUserPersonalities(userId) {
  return async (dispatch, getState) => {
    const { auth, personalities } = getState();

    if (!personalities.isLoading) {
      dispatch(
        requestPersonalities(
          userId
            ? ActionTypes.PERSONALITIES_REQUEST
            : ActionTypes.MY_PERSONALITIES_REQUEST,
        ),
      );

      try {
        const resp = await fetch(
          `${apiRoot}/userPersonalities?userId=${
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
          dispatch(receivePersonalities(data, !userId));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestPersonalities());
      }
    }
  };
}

export function fetchPersonalities() {
  return async (dispatch, getState) => {
    const { personalities } = getState();

    if (!personalities.isLoading) {
      dispatch(requestPersonalities(ActionTypes.PERSONALITIES_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/personalities`);

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receivePersonalities(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestPersonalities());
      }
    }
  };
}

export function updateUserPersonalities() {
  return async (dispatch, getState) => {
    const { form, personalities, auth } = getState();
    const updatedPersonalities = form.updatePersonalities.values.personalities;

    if (!personalities.isUpdatingPersonalities) {
      dispatch(
        requestPersonalities(ActionTypes.UPDATE_MY_PERSONALITIES_REQUEST),
      );
      try {
        const resp = await fetch(`${apiRoot}/userPersonalities/update`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.data.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ personalities: updatedPersonalities }),
        });

        if (resp.ok) {
          dispatch(
            requestPersonalities(ActionTypes.UPDATE_MY_PERSONALITIES_DONE),
          );
          dispatch(refreshMyInformation());
          dispatch(NavigationActions.back());
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestPersonalities());
      }
    }
  };
}
