import React from 'react';
import Profile from '../../components/Profile/Profile';
import Loading from '../../components/Loading/Loading';
import styles from '../../components/Loading/styles';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  users: state.users,
  tags: state.tags,
  personalities: state.personalities,
  chatrooms: state.chatrooms,
});

class ProfileScreen extends React.Component {
  render() {
    const { users, tags, personalities } = this.props;

    if (
      users.isLoadingUserInformation ||
      tags.isLoadingMyTags ||
      personalities.isLoadingMyPersonalities
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
    return <Profile myProfile />;
  }
}

export default connect(
  mapStateToProps,
  null,
)(ProfileScreen);
