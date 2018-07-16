import apiRoot from "../utils/api.config";

export const ActionTypes = {
  CHATROOMS_REQUEST: 'CHATROOMS_REQUEST',
  CHATROOMS_RECEIVED: 'CHATROOMS_RECEIVED',
  USER_CHATROOM_RECEIVED: 'USER_CHATROOM_RECEIVED',
  CHATROOM_FAILED: 'CHATROOM_FAILED'
};

export function requestChatrooms() {
  return {
    type: ActionTypes.CHATROOMS_REQUEST,
  }
}

export function receiveUserChatroom(chatroomId) {
  return {
    type: ActionTypes.USER_CHATROOM_RECEIVED,
    chatroomId
  }
}
export function failRequestChatrooms() {
  return {
    type: ActionTypes.CHATROOM_FAILED
  }
}

export function fetchUserChatroom(userId) {
  return async (dispatch, getState) => {
    const {auth, users} = getState();

    if (!users.isLoading) {
      dispatch(requestChatrooms());
      try {
        const resp = await fetch(`${apiRoot}/userChatroom?userId=${userId}`, {
          method: 'GET',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: {Authorization: `Bearer ${auth.data.token}`}
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveUserChatroom(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestChatrooms());
      }
    }
  };
}

export function fetchChatrooms() {}