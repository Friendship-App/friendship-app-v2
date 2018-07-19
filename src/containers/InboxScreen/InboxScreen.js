import React from 'react';
import Loading from '../../components/Loading';
import ChatroomsList from '../../components/ChatroomsList';
import { connect } from 'react-redux';
import { fetchChatrooms } from '../../actions/chatrooms';
import { socket } from '../../utils/socket';

const mapStateToProps = state => ({
  chatrooms: state.chatrooms,
});

const mapDispatchToProps = dispatch => ({
  refreshChatrooms: () => dispatch(fetchChatrooms()),
});

class InboxScreen extends React.Component {
  componentDidMount() {
    socket.on('message', () => {
      this.props.refreshChatrooms();
    });
  }

  componentWillUnmount() {
    socket.close();
  }

  render() {
    const { chatrooms } = this.props;

    return chatrooms.isLoading ? (
      <Loading />
    ) : (
      <ChatroomsList
        chatrooms={chatrooms.chatrooms}
        onRefresh={this.props.refreshChatrooms}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxScreen);
