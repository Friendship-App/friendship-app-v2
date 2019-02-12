import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

import TagCircle from './TagCircle';
import { fetchUserInformation } from '../../actions/users';
import { fetchUserTags } from '../../actions/tags';
import { fetchUserPersonalities } from '../../actions/personalities';
import { fetchUserChatroom } from '../../actions/chatrooms';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  openProfile: (personId, personName) => {
    dispatch(fetchUserInformation(personId));
    dispatch(fetchUserTags(personId));
    dispatch(fetchUserPersonalities(personId));
    dispatch(fetchUserChatroom(personId));
    dispatch(
      NavigationActions.navigate({
        routeName: 'PeopleProfile',
        params: { personId, personName },
      }),
    );
  },
  openMyProfile: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Profile',
      }),
    ),
});

const ParticipantWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 90;
  background-color: ${props => {
    switch (props.wrapperColor) {
      case 1:
        return '#ffffff';
      default:
        return '#f9f7f6';
    }
  }};
  display: flex;
  flex-direction: row;
`;

const ParticipantDetail = ({
  username,
  avatar,
  hateCommon,
  loveCommon,
  index,
  id,
  currentUser,
  openProfile,
  openMyProfile,
}) => {
  const {
    avatarCircle,
    usernameContentStyle,
    usernameTextStyle,
    commonNaahsAndYeahs,
  } = styles;
  const commonYeahs = [];
  for (let i = 0; i < loveCommon; i++) {
    commonYeahs.push(<TagCircle key={i} />);
  }
  const commonNaahs = [];
  for (let i = 0; i < hateCommon; i++) {
    commonNaahs.push(<TagCircle key={i} dark />);
  }

  return (
    <ParticipantWrapper
      onPress={
        currentUser === id
          ? () => openMyProfile()
          : () => openProfile(id, username)
      }
      wrapperColor={index % 2 === 1 ? 1 : ''}
    >
      <Image source={{ uri: avatar }} style={avatarCircle} />
      <View style={usernameContentStyle}>
        <Text style={usernameTextStyle}>{username}</Text>
        {!(currentUser === id) ? (
          <View style={commonNaahsAndYeahs}>
            <View style={commonNaahsAndYeahs}>{commonYeahs}</View>
            <View style={commonNaahsAndYeahs}>{commonNaahs}</View>
          </View>
        ) : null}
      </View>
    </ParticipantWrapper>
  );
};

const styles = StyleSheet.create({
  commonNaahsAndYeahs: {
    flexDirection: 'row',
  },
  avatarCircle: {
    width: 66,
    height: 66,
    marginLeft: 17,
    marginRight: 15,
    marginTop: 12,
    borderRadius: 32,
  },
  avatar: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 30 : 40,
    paddingTop: 8,
  },
  usernameContentStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  usernameTextStyle: {
    fontSize: 18,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParticipantDetail);
