import apiRoot from "../utils/api.config";

export const ActionTypes = {
  ACTIVITIES_REQUEST: 'ACTIVITIES_REQUEST',
  INTERESTS_REQUEST: 'INTERESTS_REQUEST',
  ACTIVITIES_RECEIVE: 'ACTIVITIES_RECEIVE',
  INTERESTS_RECEIVE: 'INTERESTS',
  TAGS_FAILED: 'TAGS_FAILED',
};

export function requestTags(type) {
  return {
    type,
  };
}

export function receiveActivities(activitiesList) {
  return {
    type: ActionTypes.ACTIVITIES_RECEIVE,
    activitiesList,
  };
}

export function receiveInterests(interestsList) {
  return {
    type: ActionTypes.INTERESTS_RECEIVE,
    interestsList,
  };
}

export function failRequestTags() {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.TAGS_FAILED,
    });
  };
}

export function fetchTags(type = ActionTypes.ACTIVITIES_REQUEST) {
  const endpoint = type === ActionTypes.ACTIVITIES_REQUEST ? 'activities' : 'interests';

  return async (dispatch, getState) => {
    const {tags} = getState();

    if (!tags.isLoading) {
      dispatch(requestTags(type));
      try {
        const resp = await fetch(`${apiRoot}/${endpoint}`);

        if (resp.ok) {
          const data = await resp.json();
          dispatch(type === ActionTypes.ACTIVITIES_REQUEST ? receiveActivities(data) : receiveInterests(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestTags());
      }
    }
  };
}