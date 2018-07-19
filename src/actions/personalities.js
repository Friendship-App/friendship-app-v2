import apiRoot from '../utils/api.config';

export const ActionTypes = {
  PERSONALITIES_REQUEST: 'PERSONALITIES_REQUEST',
  PERSONALITIES_RECEIVE: 'PERSONALITIES_RECEIVE',

  USER_PERSONALITIES_RECEIVED: 'USER_PERSONALITIES_RECEIVED',
  PERSONALITIES_FAILED: 'PERSONALITIES_FAILED',

  MY_PERSONALITIES_REQUEST: 'MY_PERSONALITIES_REQUEST',
  MY_PERSONALITIES_RECEIVED: 'MY_PERSONALITIES_RECEIVED',
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
