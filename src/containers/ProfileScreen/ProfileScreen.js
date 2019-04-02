import React from 'react';
import Profile from '../../components/Profile/Profile';
import Loading from '../../components/Loading/Loading';
import styles from '../../components/Loading/styles';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import BackButtonAndroid from '../../components/BackButtonAndroid';

const mapStateToProps = state => ({
  users: state.users,
  tags: state.tags,
  personalities: state.personalities,
  chatrooms: state.chatrooms,
});

class ProfileScreen extends React.Component {
  get content() {
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

  render() {
    const { navigation } = this.props;
    return (
      <BackButtonAndroid navigation={navigation}>
        {this.content}
      </BackButtonAndroid>
    );
  }
}

export default connect(
  mapStateToProps,
  null,
)(ProfileScreen);
