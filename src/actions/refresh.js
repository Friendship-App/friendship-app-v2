import { fetchBatchUsers, fetchUserInformation } from './users';
import { fetchEvents } from './events';
import { fetchChatrooms } from './chatrooms';
import { fetchUserTags } from './tags';
import { fetchUserPersonalities } from './personalities';

export const ActionTypes = {
  REFRESH: 'REFRESH',
};

export function refreshApp() {
  return {
    type: ActionTypes.REFRESH,
  };
}

export function refresh(batch = 0) {
  return async (dispatch, getState) => {
    dispatch(refreshApp());
    dispatch(fetchBatchUsers(batch));
    dispatch(fetchEvents());
    dispatch(fetchChatrooms());
    dispatch(fetchUserInformation());
    dispatch(fetchUserTags());
    dispatch(fetchUserPersonalities());
  };
}
