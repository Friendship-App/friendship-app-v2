import apiRoot from '../utils/api.config';

export const ActionTypes = {
  PERSONALITIES_REQUEST: 'PERSONALITIES_REQUEST',
  PERSONALITIES_RECEIVE: 'PERSONALITIES_RECEIVE',
  USER_PERSONALITIES_RECEIVED: 'USER_PERSONALITIES_RECEIVED',
  PERSONALITIES_FAILED: 'PERSONALITIES_FAILED',

  MY_PERSONALITIES_REQUEST: 'MY_PERSONALITIES_REQUEST',
  MY_PERSONALITIES_RECEIVED: 'MY_PERSONALITIES_RECEIVED',
};

export function requestPersonalities() {
  return {
    type: ActionTypes.PERSONALITIES_REQUEST,
  };
}

export function requestMyPersonalities() {
  return {
    type: ActionTypes.MY_PERSONALITIES_REQUEST,
  };
}

export function receivePersonalities(personalitiesList) {
  return {
    type: ActionTypes.PERSONALITIES_RECEIVE,
    personalitiesList,
  };
}

export function receiveMyPersonalities(myPersonalities) {
  return {
    type: ActionTypes.MY_PERSONALITIES_RECEIVED,
    myPersonalities,
  };
}

export function receiveUserPersonalities(userPersonalities) {
  return {
    type: ActionTypes.USER_PERSONALITIES_RECEIVED,
    userPersonalities,
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
      userId
        ? dispatch(requestPersonalities())
        : dispatch(requestMyPersonalities());
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
          userId
            ? dispatch(receivePersonalities(data))
            : dispatch(receiveMyPersonalities(data));
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
      dispatch(requestPersonalities());
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
