import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Loading from '../../components/Loading';
import styles from '../../components/Loading/styles';
import Profile from '../../components/Profile';

const mapStateToProps = state => ({
  users: state.users,
  tags: state.tags,
  personalities: state.personalities,
  chatrooms: state.chatrooms,
});

class PeopleProfileScreen extends React.Component {
  render = () => {
    const { users, tags, personalities, chatrooms } = this.props;

    if (
      users.isLoadingUserInformation ||
      tags.isLoading ||
      personalities.isLoading ||
      chatrooms.isLoadingUserChatroom
    ) {
      return <Loading />;
    }
    if (users.isError) {
      return (
        <View style={[styles.loading]}>
          <Text>Something went wrong, please try again later</Text>
        </View>
      );
    }

    return <Profile />;
  };
}

export default connect(
  mapStateToProps,
  null,
)(PeopleProfileScreen);
