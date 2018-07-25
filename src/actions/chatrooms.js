import apiRoot from '../utils/api.config';

export const ActionTypes = {
  CHATROOMS_REQUEST: 'CHATROOMS_REQUEST',
  CHATROOMS_RECEIVED: 'CHATROOMS_RECEIVED',
  USER_CHATROOM_REQUEST: 'USER_CHATROOM_REQUEST',
  USER_CHATROOM_RECEIVED: 'USER_CHATROOM_RECEIVED',

  CHATROOM_MESSAGES_REQUEST: 'CHATROOM_MESSAGES_REQUEST',
  CHATROOM_MESSAGES_RECEIVED: 'CHATROOM_MESSAGES_RECEIVED',

  CHATROOM_UPDATE_MESSAGES_REQUEST: 'CHATROOM_UPDATE_MESSAGES_REQUEST',
  CHATROOM_UPDATE_MESSAGES_RECEIVED: 'CHATROOM_UPDATE_MESSAGES_RECEIVED',

  CHATROOM_FAILED: 'CHATROOM_FAILED',
};

export function requestChatrooms() {
  return {
    type: ActionTypes.CHATROOMS_REQUEST,
  };
}

export function requestChatroomMessages() {
  return {
    type: ActionTypes.CHATROOM_MESSAGES_REQUEST,
  };
}

export function requestUpdateMessages() {
  return {
    type: ActionTypes.CHATROOM_UPDATE_MESSAGES_REQUEST,
  };
}

export function receiveUpdateMessages() {
  return {
    type: ActionTypes.CHATROOM_UPDATE_MESSAGES_RECEIVED,
  };
}

export function requestUserChatroom() {
  return {
    type: ActionTypes.USER_CHATROOM_REQUEST,
  };
}

export function receiveUserChatroom(chatroomId) {
  return {
    type: ActionTypes.USER_CHATROOM_RECEIVED,
    chatroomId,
  };
}

export function receiveChatrooms(chatrooms) {
  return {
    type: ActionTypes.CHATROOMS_RECEIVED,
    chatrooms,
  };
}

export function receiveChatroomMessages(messages) {
  return {
    type: ActionTypes.CHATROOM_MESSAGES_RECEIVED,
    messages,
  };
}

export function failRequestChatrooms() {
  return {
    type: ActionTypes.CHATROOM_FAILED,
  };
}

export function fetchUserChatroom(userId) {
  return async (dispatch, getState) => {
    const { auth, chatrooms } = getState();

    if (!chatrooms.isLoading) {
      dispatch(requestUserChatroom());
      try {
        const resp = await fetch(`${apiRoot}/userChatroom?userId=${userId}`, {
          method: 'GET',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${auth.data.token}` },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveUserChatroom(data.length > 0 ? data[0] : -1));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestChatrooms());
      }
    }
  };
}

export function fetchChatrooms() {
  return async (dispatch, getState) => {
    const { auth, chatrooms } = getState();

    if (!chatrooms.isLoading) {
      dispatch(requestChatrooms());
      try {
        const resp = await fetch(`${apiRoot}/chatrooms`, {
          method: 'GET',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${auth.data.token}` },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveChatrooms(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failRequestChatrooms());
      }
    }
  };
}

export function fetchChatroomMessages(chatroomId) {
  return async (dispatch, getState) => {
    const { chatrooms, auth } = getState();

    if (!chatrooms.isLoadingMessages) {
      dispatch(requestChatroomMessages());
      try {
        const resp = await fetch(
          `${apiRoot}/messages?chatroomId=${chatroomId}`,
          {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${auth.data.token}` },
          },
        );

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveChatroomMessages(data));
        }
      } catch (e) {
        dispatch(failRequestChatrooms());
      }
    }
  };
}

export function updateMessages(chatroomId) {
  return async (dispatch, getState) => {
    const { chatrooms, auth } = getState();

    if (!chatrooms.isUpdatingMessages) {
      dispatch(requestUpdateMessages());
      try {
        const resp = await fetch(
          `${apiRoot}/messages/update?chatroomId=${chatroomId}`,
          {
            method: 'PUT',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: { Authorization: `Bearer ${auth.data.token}` },
          },
        );

        if (resp.ok) {
          dispatch(receiveUpdateMessages());
        }
      } catch (e) {
        dispatch(failRequestChatrooms());
      }
    }
  };
}
