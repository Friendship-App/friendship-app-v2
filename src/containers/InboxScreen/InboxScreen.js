import React from 'react';
import ChatroomsList from '../../components/ChatroomsList';
import { connect } from 'react-redux';
import { fetchChatrooms } from '../../actions/chatrooms';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = state => ({
  chatrooms: state.chatrooms,
});

const mapDispatchToProps = dispatch => ({
  refreshChatrooms: () => dispatch(fetchChatrooms()),
  goToPeopleView: () =>
    dispatch(NavigationActions.navigate({ routeName: 'People' })),
});

class InboxScreen extends React.Component {
  render() {
    const { chatrooms, goToPeopleView } = this.props;

    return (
      <ChatroomsList
        chatrooms={chatrooms.chatrooms}
        onRefresh={this.props.refreshChatrooms}
        goToPeopleView={goToPeopleView}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxScreen);
