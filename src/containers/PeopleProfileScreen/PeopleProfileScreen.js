import React from 'react';
import {ScrollView, Text, View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {fetchUserInformation} from "../../actions/users";
import {fetchUserTags} from "../../actions/tags";
import {fetchUserPersonalities} from "../../actions/personalities";
import {fetchUserChatroom} from "../../actions/chatrooms";
import Loading from "../../components/Loading";
import Personality from "../../components/Personality";
import ProfileTopPart from "../../components/ProfileTopPart";
import {colors, fonts, fontSizes, paddings} from "../../styles";
import ShowTags from "../../components/ShowTags";

const mapStateToProps = state => ({
  userDetails: state.users.userDetails,
  users: state.users,
  tags: state.tags,
  personality: state.personalities,
  chatrooms: state.chatrooms,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(fetchUserInformation(userId)),
  fetchTags: userId => dispatch(fetchUserTags(userId)),
  fetchPersonalities: userId => dispatch(fetchUserPersonalities(userId)),
  fetchChatroom: userId => dispatch(fetchUserChatroom(userId)),
  /*refreshTagsForUser: userId =>
    dispatch(rest.actions.tagsForUser.get({ userId })),
  refreshPersonalitiesForUser: userId =>
    dispatch(rest.actions.personalitiesForUser.get({ userId })),
  fetchUserChatrooms: id =>
    dispatch(rest.actions.chatRoomsWithUserId.get({ id })),
  openChatRequest: (user, previousRoute) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatRequest',
        params: { user, route: previousRoute },
      }),
    ),
  openChatView: (existingChatRoomId, username, avatar, id) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: {
          existingChatRoomId,
          username,
          avatar,
          id,
        },
      }),
    ),*/
});

class PeopleProfileScreen extends React.Component {
  componentWillMount() {
    this.fetchUserInfo();
  }

  /*componentWillReceiveProps(nextProps) {
    // render the profile user when we have the data.
    if (!nextProps.userDetails.loading && !nextProps.tagsForUser.loading) {
      this.setState({
        loaded: true,
      });
    }
  }*/

  fetchUserInfo = () => {
    const userId = this.props.navigation.state.params.personId;
    this.props.fetchUser(userId);
    this.props.fetchTags(userId);
    this.props.fetchPersonalities(userId);
    this.props.fetchChatroom(userId);
  };

  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  renderPersonalities() {
    const {userDetails} = this.props;
    const personalities = userDetails.userPersonalities.map(
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
        {personalities.length > 0 ? (
          personalities
        ) : (
          <Text>No selected personalities</Text>
        )}
      </View>
    );
  }

  renderUserDescription = () => {
    const description = this.props.userDetails.data.description
      ? this.props.userDetails.data.description
      : ' No description';

    return description;
  };

  renderNotLoggedIn = () => {
    return (
      <View style={{marginTop: 30}}>
        <Text style={{alignSelf: 'center'}}>You need to sign in!</Text>
      </View>
    );
  };

  render = () => {
    const {userDetails, tags, personality, chatrooms, users} = this.props;

    if (!userDetails.data || users.isLoading || tags.isLoading || personality.isLoading || chatrooms.isLoading) {
      return (<Loading/>);
    }

    let loveCommon = userDetails.data.loveInCommon
      ? this.props.userDetails.data.loveInCommon
      : 0;

    let hateCommon = userDetails.data.hateCommon
      ? this.props.userDetails.data.hateCommon
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
          username={this.props.userDetails.data.username}
          srcImage={this.props.userDetails.data.image}
          location={location}
          age={/*this.state.age*/0}
          genders={genders}
          avatar={this.props.userDetails.data.avatar}
          numberOfYeah={loveCommon}
          numberOfNaah={hateCommon}
          navigateBack={this.navigateBack}
          birthyear={this.props.userDetails.data.birthyear}
          genderList={this.props.userDetails.data.genders}
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
          hate={userDetails.data.hateTags}
          love={userDetails.data.loveTags}
          existingChatRoom={userDetails.chatroomId > 0 ? userDetails.chatroomId : -1}
        />
      </ScrollView>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleProfileScreen);
