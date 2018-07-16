import React from 'react';
import {colors, fonts, fontSizes, paddings} from "../../styles";
import {Dimensions, ScrollView, Text, View} from "react-native";
import ProfileTopPart from "../ProfileTopPart";
import ShowTags from "../ShowTags";
import Personality from "../Personality";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  userDetails : state.users.userDetails,
  tags: state.tags,
  personalities: state.personalities,
  chatrooms: state.chatrooms,
});

class Profile extends React.Component {
  renderPersonalities() {
    const {personalities} = this.props;
    const userPersonalities = personalities.userPersonalities.map(
      personality => {
        return (
          <Personality
            key={personality.id}
            personality={personality.name}
            small={true}
          />
        );
      },
    );

    return (
      <View style={{flexDirection: 'row', paddingVertical: 10, paddingHorizontal: Dimensions.get('window').width <= 320 ? paddings.XS : paddings.MD, alignItems: 'center', justifyContent: 'space-between'}}>
        {userPersonalities.length > 0 ? (
          userPersonalities
        ) : (
          <Text>No selected personalities</Text>
        )}
      </View>
    );
  }

  renderUserDescription = () => {
    const {userDetails} = this.props;
    const description = userDetails.data.description
      ? this.props.userDetails.data.description
      : ' No description';

    return description;
  };

  render () {
    const {userDetails, tags, chatrooms} = this.props;

    let loveCommon = tags.userTags.loveInCommon
      ? tags.userTags.loveInCommon
      : 0;

    let hateCommon = tags.userTags.hateInCommon
      ? tags.userTags.hateInCommon
      : 0;

    const location = userDetails.data.locations.length > 0
      ? userDetails.data.locations.join(',')
      : 'Narnia';

    const genders = userDetails.data.genders
      ? this.props.userDetails.data.genders.join(' and ')
      : null;

    return (
      <ScrollView style={{flex: 1}}>
        <ProfileTopPart
          username={userDetails.data.username}
          srcImage={userDetails.data.image}
          location={location}
          age={/*this.state.age*/0}
          genders={genders}
          avatar={userDetails.data.avatar}
          numberOfYeah={loveCommon}
          numberOfNaah={hateCommon}
          birthyear={userDetails.data.birthyear}
          genderList={userDetails.data.genders}
        />

        <View style={{
          backgroundColor: colors.DUST_WHITE,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingVertical: paddings.SM,
          paddingHorizontal: paddings.LG
        }}>
          <Text style={{fontFamily: fonts.LIGHT, fontSize: fontSizes.BODY_TEXT, textAlign: 'center'}}>{this.renderUserDescription()}</Text>
          <Text style={{
            fontFamily: fonts.LIGHT,
            fontSize: fontSizes.BODY_TEXT,
            textAlign: 'center'
          }}>{this.renderUserDescription()}</Text>
        </View>
        <View style={{backgroundColor: colors.DUST_WHITE, borderBottomWidth: 4, borderBottomColor: colors.MEDIUM_GREY, paddingBottom: paddings.SM}}>
          {this.renderPersonalities()}
        </View>
        <ShowTags
          onChatRequest={() => console.log('chat request')}
          openChatView={() => console.log('chat view')}
          hate={tags.userTags.hateTags}
          love={tags.userTags.loveTags}
          existingChatRoom={chatrooms.chatroomId > 0 ? chatrooms.chatroomId : -1}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, null)(Profile)