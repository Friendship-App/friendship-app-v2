import React from 'react';
import {connect} from 'react-redux';
import Loading from "../../components/Loading";
import Profile from "../../components/Profile";

const mapStateToProps = state => ({
  users: state.users,
  tags: state.tags,
  personalities: state.personalities,
  chatrooms: state.chatrooms,
});

class PeopleProfileScreen extends React.Component {
  render = () => {
    const {users, tags, personalities, chatrooms} = this.props;

    if (users.isLoading || tags.isLoading || personalities.isLoading || chatrooms.isLoading) {
      return (<Loading/>);
    }

    return (<Profile/>)
  };
}

export default connect(mapStateToProps, null)(PeopleProfileScreen);
