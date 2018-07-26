import apiRoot from '../utils/api.config';

export const ActionTypes = {
  MOODS_REQUEST: 'MOODS_REQUEST',
  MOODS_RECEIVE: 'MOODS_RECEIVE',
  MOODS_FAILED: 'MOODS_FAILED',
};

export function requestMoods() {
  return {
    type: ActionTypes.MOODS_REQUEST,
  };
}

export function receiveMoods(moodsList) {
  return {
    type: ActionTypes.MOODS_RECEIVE,
    moodsList,
  };
}

export function failRequestMoods() {
  return async dispatch => {
    dispatch({
      type: ActionTypes.MOODS_FAILED,
    });
  };
}

export function fetchMoods() {
  return async (dispatch, getState) => {
    const { locations } = getState();

    if (!locations.isLoading) {
      dispatch(requestMoods());
      try {
        const resp = await fetch(`${apiRoot}/moods`);

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveMoods(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestMoods());
      }
    }
  };
}
