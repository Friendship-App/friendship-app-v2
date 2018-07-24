import { fetchBatchUsers, fetchUserInformation } from './users';
import { fetchEvents } from './events';
import { fetchChatrooms } from './chatrooms';
import { fetchUserTags } from './tags';
import { fetchUserPersonalities } from './personalities';

export const ActionTypes = {
  REFRESH: 'REFRESH',
  REFRESH_MY_INFORMATION: 'REFRESH_MY_INFORMATION',
};

export function refreshApp(type) {
  return {
    type,
  };
}

export function refresh(batch = 0) {
  return async (dispatch, getState) => {
    dispatch(refreshApp(ActionTypes.REFRESH));
    dispatch(fetchBatchUsers(batch));
    dispatch(fetchEvents());
    dispatch(fetchChatrooms());
  };
}

export function refreshMyInformation() {
  return async (dispatch, getState) => {
    dispatch(refreshApp(ActionTypes.REFRESH_MY_INFORMATION));
    dispatch(fetchUserInformation());
    dispatch(fetchUserTags());
    dispatch(fetchUserPersonalities());
  };
}
