import React from 'react';
import {connect} from 'react-redux';
import {ScrollView} from "react-native";
import {fetchAvatars} from "../../actions/avatars";
import Avatar from "../Avatar";
import Loading from "../Loading";
import {paddings} from "../../styles";

const mapDispatchToProps = dispatch => ({
  fetchAvatars: () => dispatch(fetchAvatars()),
});

const mapStateToProps = state => ({
  avatars: state.avatars,
});

class AvatarList extends React.Component {
  state = {
    avatar: '',
  };

  componentWillMount() {
    this.props.fetchAvatars();
  }

  updateAvatar = newAvatar => {
    this.setState({ avatar: newAvatar });
  };

  render() {
    const { input } = this.props;

    if (this.props.avatars.isLoading) {
      return <Loading/>;
    }

    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewMoodContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ height: 70, marginTop: paddings.XS }}
      >
        {this.renderAvatars(input)}
      </ScrollView>
    );
  }

  checkAvatar(e) {
    return e === this.state.avatar ? '' : e;
  }

  _keyExtractor = (item, index) => `avatarList-${item.id}`;

  renderAvatars(input) {
    return this.props.avatars.avatarsList.map(avatar => (
      <Avatar
        updateAvatar={newAvatar => {
          let result = this.checkAvatar(newAvatar);
          input.onChange(result);
          this.updateAvatar(result);
        }}
        selectedAvatar={input.avatar}
        key={this._keyExtractor(avatar)}
        avatar={avatar.uri}
        selected={this.state.avatar === avatar.uri}
      />
    ));
  }
}

const styles = {
  scrollViewMoodContainer: {
    justifyContent: 'space-around',
    height: 70,
    paddingRight: 23,
    /*paddingLeft: 23,*/
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarList);
