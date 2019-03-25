import React from 'react';
import ChatroomsList from '../../components/ChatroomsList';
import { connect } from 'react-redux';
import { fetchChatrooms } from '../../actions/chatrooms';
import { NavigationActions } from 'react-navigation';
import BackButtonAndroid from '../../components/BackButtonAndroid';

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
    const { chatrooms, goToPeopleView, navigation } = this.props;

    return (
      <BackButtonAndroid navigation={navigation}>
        <ChatroomsList
          chatrooms={chatrooms.chatrooms}
          onRefresh={this.props.refreshChatrooms}
          goToPeopleView={goToPeopleView}
        />
      </BackButtonAndroid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxScreen);
