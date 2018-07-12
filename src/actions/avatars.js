import apiRoot from "../utils/api.config";

export const ActionTypes = {
  AVATARS_REQUEST: 'AVATARS_REQUEST',
  AVATARS_RECEIVE: 'AVATARS_RECEIVE',
  AVATARS_FAILED: 'AVATARS_FAILED',
};

export function requestAvatars() {
  return {
    type: ActionTypes.AVATARS_REQUEST,
  };
}

export function receiveAvatars(avatarsList) {
  return {
    type: ActionTypes.AVATARS_RECEIVE,
    avatarsList,
  };
}

export function failRequestAvatars() {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.AVATARS_FAILED,
    });
  };
}

export function fetchAvatars() {
  return async (dispatch, getState) => {
    const { locations } = getState();

    if (!locations.isLoading) {
      dispatch(requestAvatars());
      try {
        const resp = await fetch(`${apiRoot}/avatars`);

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveAvatars(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestAvatars());
      }
    }
  };
}