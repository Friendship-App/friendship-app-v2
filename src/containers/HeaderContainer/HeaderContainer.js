import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, paddings } from '../../styles';
import TabIcons from '../../../assets/tabIcons';
import { IconImage } from '../../components/Layout/Layout';
import { Image, Text, TouchableOpacity } from 'react-native';
import {
  fetchChatroomMessages,
  fetchUserChatroom,
} from '../../actions/chatrooms';
import { fetchUserTags } from '../../actions/tags';
import { fetchUserPersonalities } from '../../actions/personalities';
import { fetchUserInformation } from '../../actions/users';

const mapDispatchToProps = dispatch => ({
  back: (backTo = {}) => dispatch(NavigationActions.back(backTo)),
  navigateTo: (screen, args = {}) =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: screen,
            params: args,
          }),
        ],
      }),
    ),
  openProfile: personId => {
    dispatch(fetchUserInformation(personId));
    dispatch(fetchUserTags(personId));
    dispatch(fetchUserPersonalities(personId));
    dispatch(fetchUserChatroom(personId));
    return dispatch(
      NavigationActions.navigate({
        routeName: 'PeopleProfile',
        params: { personId },
      }),
    );
  },
  openChat: (chatroomId, eventTitle, eventId, eventImage) => {
    dispatch(fetchChatroomMessages(chatroomId));
    dispatch(
      NavigationActions.navigate({
        routeName: 'Chat',
        params: {
          chatroomId,
          eventTitle,
          eventId,
          eventImage,
          fromEvent: true,
        },
      }),
    );
  },
});

const mapStateToProps = state => ({
  nav: state.nav,
  chatrooms: state.chatrooms,
  auth: state.auth,
});

class HeaderContainer extends Component {
  state = {
    showModal: false,
  };

  render() {
    return (
      <Header
        leftComponent={this.getLeftComponent(this.props.left)}
        rightComponent={this.getRightComponent(this.props.right)}
        title={this.props.title}
        titleComponent={this.props.titleComponent}
        color={this.props.color}
      />
    );
  }

  getLeftComponent(type) {
    switch (type) {
      case 'cancel':
        return (
          <Button
            text="Cancel"
            type="secondary"
            header
            onPress={() => this.props.back(this.props.backTo)}
          />
        );
      case 'back':
        return (
          <Button
            icon={
              <Icon name={'md-arrow-back'} color={colors.ORANGE} size={26} />
            }
            type="secondary"
            header
            onPress={() => this.props.back(this.props.backTo)}
          />
        );
      case 'white-back':
        return (
          <Button
            icon={
              <Icon name={'md-arrow-back'} color={colors.WHITE} size={26} />
            }
            type="floatingButton"
            header
            onPress={() => this.props.back(this.props.backTo)}
          />
        );
    }
  }

  getRightComponent(type) {
    switch (type) {
      case 'join':
        return (
          <Button
            text="Join"
            type="secondary"
            header
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        );
      case 'event-chat':
        if (
          !this.props.nav.isTransitioning &&
          this.props.nav.routes[this.props.nav.index].params.userParticipate
        ) {
          const {
            chatroomId,
            eventTitle,
            eventId,
            eventImage,
          } = this.props.nav.routes[this.props.nav.index].params;
          return (
            <Button
              icon={
                <IconImage
                  source={TabIcons['Inbox']}
                  tintColor={colors.WHITE}
                  style={{ marginVertical: paddings.XXS }}
                />
              }
              type="floatingButton"
              header
              onPress={() => {
                this.props.openChat(
                  chatroomId,
                  eventTitle,
                  eventId,
                  eventImage,
                );
              }}
            />
          );
        }
        break;

      case 'chat':
        if (!this.props.nav.isTransitioning) {
          const {
            chatroomId,
            isEventChatroom,
            participantId,
            eventId,
            image,
            title,
            fromEvent,
            fromProfile,
          } = this.props.nav.routes[this.props.nav.index].params;

          return (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              disabled={fromEvent || fromProfile}
              onPress={() => {
                isEventChatroom
                  ? console.log('event...')
                  : this.props.openProfile(participantId);
              }}
            >
              <Image
                source={{ uri: image }}
                style={[
                  { width: 35, height: 35, marginRight: 5, borderRadius: 17 },
                ]}
              />
              <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 15 }}>
                {title}
              </Text>
            </TouchableOpacity>
          );
        }
    }
  }
}

HeaderContainer.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
