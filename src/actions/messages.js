import apiRoot from '../utils/api.config';
import { fetchChatroomMessages, fetchChatrooms } from './chatrooms';

export const ActionTypes = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  MESSAGE_SENT: 'MESSAGE_SENT',
  SEND_MESSAGE_FAIL: 'SEND_MESSAGE_FAIL',
};

export function sendingMessage() {
  return {
    type: ActionTypes.SEND_MESSAGE,
  };
}

export function messageSent() {
  return {
    type: ActionTypes.MESSAGE_SENT,
  };
}

export function failSendMessage() {
  return {
    type: ActionTypes.SEND_MESSAGE_FAIL,
  };
}

export function sendMessage(chatroomId, textMessage, receiverId) {
  return async (dispatch, getState) => {
    const { auth } = getState();
    dispatch(sendingMessage());
    try {
      const resp = await fetch(`${apiRoot}/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.data.token}`,
        },
        body: JSON.stringify({
          chatroomId,
          textMessage,
          receiverId,
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        dispatch(messageSent());
        dispatch(fetchChatroomMessages(data.chatroomId));
        dispatch(fetchChatrooms());
      } else {
        throw Error;
      }
    } catch (e) {
      dispatch(failSendMessage());
    }
  };
}
