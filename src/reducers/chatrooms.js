import { ActionTypes } from '../actions/chatrooms';

const initialState = {
  isLoading: false,
  isLoadingUserChatroom: false,
  chatrooms: [],
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHATROOMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.CHATROOMS_RECEIVED:
      return {
        ...state,
        chatrooms: action.chatrooms,
        isLoading: false,
      };

    case ActionTypes.USER_CHATROOM_RECEIVED:
      return {
        ...state,
        chatroomId: action.chatroomId,
        isLoadingUserChatroom: false,
      };

    case ActionTypes.USER_CHATROOM_REQUEST:
      return {
        ...state,
        isLoadingUserChatroom: true,
      };

    case ActionTypes.CHATROOM_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoadingUserChatroom: false,
      };

    default:
      return state;
  }
}
