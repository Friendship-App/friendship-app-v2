import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ProfileTopPart from '../ProfileTopPart';
import ShowTags from '../ShowTags';
import Personality from '../Personality';
import { connect } from 'react-redux';
import styles from './styles';
import { fetchChatroomMessages } from '../../actions/chatrooms';

const mapStateToProps = state => ({
  users: state.users,
  userDetails: state.users.userDetails,
  tags: state.tags,
  personalities: state.personalities,
  chatrooms: state.chatrooms,
});

const mapDispatchToProps = dispatch => ({
  openChatRequest: reachedUser =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatRequest',
        params: { reachedUser },
      }),
    ),
  openChatView: (chatroomId, isEventChatroom, image, title, participantId) => {
    dispatch(fetchChatroomMessages(chatroomId));
    dispatch(
      NavigationActions.navigate({
        routeName: 'Chat',
        params: {
          chatroomId,
          isEventChatroom,
          image,
          title,
          participantId,
          fromProfile: true,
        },
      }),
    );
  },
});

class Profile extends React.Component {
  renderPersonalities() {
    const { personalities, myProfile } = this.props;
    const userPersonalities = myProfile
      ? personalities.myPersonalities
      : personalities.personalitiesList;
    const personalitiesArray = userPersonalities.map((personality, index) => {
      return (
        <Personality
          key={personality.id}
          personality={personality.name}
          small={true}
          isLast={index === userPersonalities.length - 1}
        />
      );
    });

    return (
      <View style={[styles.personalitiesContainer]}>
        {personalitiesArray.length > 0 ? (
          personalitiesArray
        ) : (
          <Text>No selected personalities</Text>
        )}
      </View>
    );
  }

  renderUserDescription = () => {
    const { users, myProfile } = this.props;
    const userData = myProfile ? users.myDetails : users.userDetails;
    const description = userData.data.description
      ? userData.data.description
      : ' No description';

    return description;
  };

  renderSendMsg = () => {
    const openChat = () => {
      const { chatroomId } = this.props.chatrooms;
      chatroomId > 0
        ? this.props.openChatView(
            chatroomId,
            false,
            this.props.userDetails.data.image,
            this.props.userDetails.data.username,
            this.props.userDetails.data.id,
          )
        : this.props.openChatRequest(this.props.userDetails);
    };

    if (!this.props.myProfile) {
      return (
        <TouchableOpacity onPress={openChat} style={[styles.buttonStyle]}>
          <Text style={[styles.textButtonStyle]}>Send Message</Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const { tags, myProfile, users } = this.props;
    let userData, userTags;

    if (myProfile) {
      userData = users.myDetails;
      userTags = tags.myTags;
    } else {
      userData = users.userDetails;
      userTags = tags.userTags;
    }

    const { hateTags, loveTags, commonTagPercent } = userTags;
    const numberOfYeah = loveTags.length;
    const numberOfNaah = hateTags.length;

    const location =
      userData.data.locations.length > 0
        ? userData.data.locations.join(',')
        : 'Narnia';

    const genders = userData.data.genders
      ? userData.data.genders.join(' and ')
      : null;

    return (
      <ScrollView style={[styles.container]}>
        <ProfileTopPart
          username={userData.data.username}
          srcImage={userData.data.image}
          location={location}
          genders={genders}
          mood={userData.data.mood}
          numberOfYeah={numberOfYeah}
          numberOfNaah={numberOfNaah}
          commonTagPercent={commonTagPercent}
          birthyear={userData.data.birthyear}
          genderList={userData.data.genders}
          myProfile={myProfile}
        />

        <View style={[styles.descriptionContainer]}>
          <Text style={[styles.descriptionText]}>
            {this.renderUserDescription()}
          </Text>
        </View>
        {this.renderPersonalities()}
        <ShowTags hate={hateTags} love={loveTags} myProfile={myProfile} />
        {this.renderSendMsg()}
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
