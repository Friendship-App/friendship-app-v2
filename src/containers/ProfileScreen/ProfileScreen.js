import React from 'react';
import Profile from '../../components/Profile/Profile';
import Loading from '../../components/Loading/Loading';
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

    if (users.isLoading || tags.isLoading || personalities.isLoading) {
      return <Loading />;
    }
    return <Profile myProfile />;
  }
}

export default connect(
  mapStateToProps,
  null,
)(ProfileScreen);
