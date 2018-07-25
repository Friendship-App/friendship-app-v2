import React from 'react';
import { connect } from 'react-redux';
import { createNewChatroom } from '../../actions/chatrooms';
import ChatRequest from '../../components/ChatRequest';

const mapDispatchToProps = dispatch => ({
  send: (message, participantId) =>
    dispatch(createNewChatroom(message, participantId)),
});

const ChatRequestScreen = props => {
  return (
    <ChatRequest
      handleSendMessage={message =>
        props.send(message, props.navigation.state.params.reachedUser)
      }
      reachedUser={props.navigation.state.params.reachedUser.data.username}
    />
  );
};

export default connect(
  null,
  mapDispatchToProps,
)(ChatRequestScreen);
