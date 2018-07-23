import React from 'react';
import { colors, fonts, fontSizes, paddings } from '../../styles';
import { Dimensions, Modal, ScrollView, Text, View } from 'react-native';
import ProfileTopPart from '../ProfileTopPart';
import ShowTags from '../ShowTags';
import Personality from '../Personality';
import { connect } from 'react-redux';
import personalities from '../../reducers/personalities';

const mapStateToProps = state => ({
  users: state.users,
  userDetails: state.users.userDetails,
  tags: state.tags,
  personalities: state.personalities,
  chatrooms: state.chatrooms,
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
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal:
            Dimensions.get('window').width <= 320 ? paddings.XS : paddings.MD,
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
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

  render() {
    const { tags, chatrooms, myProfile, users } = this.props;
    let userData, userTags;

    if (myProfile) {
      userData = users.myDetails;
      userTags = tags.myTags;
    } else {
      userData = users.userDetails;
      userTags = tags.userTags;
    }

    let loveCommon = userTags.loveInCommon ? userTags.loveInCommon : 0;

    let hateCommon = userTags.hateInCommon ? userTags.hateInCommon : 0;

    const location =
      userData.data.locations.length > 0
        ? userData.data.locations.join(',')
        : 'Narnia';

    const genders = userData.data.genders
      ? userData.data.genders.join(' and ')
      : null;

    return (
      <ScrollView style={{ flex: 1 }}>
        <ProfileTopPart
          username={userData.data.username}
          srcImage={userData.data.image}
          location={location}
          genders={genders}
          avatar={userData.data.avatar}
          numberOfYeah={loveCommon}
          numberOfNaah={hateCommon}
          birthyear={userData.data.birthyear}
          genderList={userData.data.genders}
          myProfile={myProfile}
        />

        <View
          style={{
            backgroundColor: colors.DUST_WHITE,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingVertical: paddings.SM,
            paddingHorizontal: paddings.LG,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.LIGHT,
              fontSize: fontSizes.BODY_TEXT,
              textAlign: 'center',
            }}
          >
            {this.renderUserDescription()}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.DUST_WHITE,
            borderBottomWidth: 4,
            borderBottomColor: colors.MEDIUM_GREY,
            paddingBottom: paddings.SM,
          }}
        >
          {this.renderPersonalities()}
        </View>
        <ShowTags
          onChatRequest={() => console.log('chat request')}
          openChatView={() => console.log('chat view')}
          hate={userTags.hateTags}
          love={userTags.loveTags}
          existingChatRoom={
            chatrooms.chatroomId > 0 ? chatrooms.chatroomId : -1
          }
        />
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  null,
)(Profile);
