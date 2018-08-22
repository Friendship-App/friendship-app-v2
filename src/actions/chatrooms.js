import apiRoot from '../utils/api.config';
import { sendMessage } from './messages';
import { NavigationActions, StackActions } from 'react-navigation';

export const ActionTypes = {
  CHATROOMS_REQUEST: 'CHATROOMS_REQUEST',
  CHATROOMS_RECEIVED: 'CHATROOMS_RECEIVED',
  USER_CHATROOM_REQUEST: 'USER_CHATROOM_REQUEST',
  USER_CHATROOM_RECEIVED: 'USER_CHATROOM_RECEIVED',

  CHATROOM_MESSAGES_REQUEST: 'CHATROOM_MESSAGES_REQUEST',
  CHATROOM_MESSAGES_RECEIVED: 'CHATROOM_MESSAGES_RECEIVED',

  CHATROOM_UPDATE_MESSAGES_REQUEST: 'CHATROOM_UPDATE_MESSAGES_REQUEST',
  CHATROOM_UPDATE_MESSAGES_RECEIVED: 'CHATROOM_UPDATE_MESSAGES_RECEIVED',

  CREATE_CHATROOM_REQUEST: 'CREATE_CHATROOM_REQUEST',
  CREATE_CHATROOM_SUCCESS: 'CREATE_CHATROOM_SUCCESS',

  CHATROOM_FAILED: 'CHATROOM_FAILED',
};

export function requestChatrooms(type) {
  return {
    type,
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
      dispatch(requestChatrooms(ActionTypes.USER_CHATROOM_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/userChatroom?userId=${userId}`, {
          method: 'GET',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${auth.data.token}` },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(
            receiveUserChatroom(data.length > 0 ? data[0].chatroomId : -1),
          );
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
      dispatch(requestChatrooms(ActionTypes.CHATROOMS_REQUEST));
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
      dispatch(requestChatrooms(ActionTypes.CHATROOM_MESSAGES_REQUEST));
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
      dispatch(requestChatrooms(ActionTypes.CHATROOM_UPDATE_MESSAGES_REQUEST));
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
          dispatch(
            requestChatrooms(ActionTypes.CHATROOM_UPDATE_MESSAGES_RECEIVED),
          );
        }
      } catch (e) {
        dispatch(failRequestChatrooms());
      }
    }
  };
}

export function createNewChatroom(message, reachedUser) {
  return async (dispatch, getState) => {
    const { chatrooms, auth, nav } = getState();

    if (!chatrooms.isCreatingChatroom) {
      dispatch(requestChatrooms(ActionTypes.CREATE_CHATROOM_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/chatrooms/create`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.data.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creatorId: auth.data.decoded.id,
            participantId: reachedUser.data.id,
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(requestChatrooms(ActionTypes.CREATE_CHATROOM_SUCCESS));
          await dispatch(sendMessage(data.id, message, [reachedUser.data.id]));
          dispatch(
            StackActions.replace({
              key: nav.routes[nav.index].key,
              routeName: 'Chat',
              params: {
                isEventChatroom: data.isEventChatroom,
                chatroomId: data.id,
                image: reachedUser.data.image,
                title: reachedUser.data.username,
                participantId: reachedUser.data.id,
                fromProfile: true,
              },
            }),
          );
        }
      } catch (e) {
        dispatch(failRequestChatrooms());
      }
    }
  };
}
