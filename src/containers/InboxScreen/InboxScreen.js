import React from 'react';
import Loading from '../../components/Loading';
import ChatroomsList from '../../components/ChatroomsList';
import { connect } from 'react-redux';
import { fetchChatrooms } from '../../actions/chatrooms';

const mapStateToProps = state => ({
  chatrooms: state.chatrooms,
});

const mapDispatchToProps = dispatch => ({
  refreshChatrooms: () => dispatch(fetchChatrooms()),
});

const InboxScreen = props => {
  const { chatrooms } = props;

  return chatrooms.isLoading ? (
    <Loading />
  ) : (
    <ChatroomsList
      chatrooms={chatrooms.chatrooms}
      onRefresh={props.refreshChatrooms}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxScreen);
