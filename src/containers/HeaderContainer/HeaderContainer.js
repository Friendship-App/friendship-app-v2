import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, headerPalette, paddings } from '../../styles';
import TabIcons from '../../../assets/tabIcons';
import { IconImage } from '../../components/Layout/Layout';
import WithNotificationIcon from '../../components/WithNotificationIcon';
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fetchChatroomMessages,
  fetchUserChatroom,
} from '../../actions/chatrooms';
import { fetchUserTags } from '../../actions/tags';
import { fetchUserPersonalities } from '../../actions/personalities';
import { fetchUserInformation } from '../../actions/users';
import ActionsModal from '../../components/ActionsModal';
import { fetchEventDetails } from '../../actions/events';

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
  openEvent: (eventId, active) => {
    dispatch(fetchEventDetails(eventId));
    dispatch(
      NavigationActions.navigate({
        routeName: 'EventDetails',
        params: {
          userParticipate: true,
          active,
        },
      }),
    );
  },
  openChat: (chatroomId, eventTitle, eventId, eventImage, active) => {
    dispatch(fetchChatroomMessages(chatroomId));
    dispatch(
      NavigationActions.navigate({
        routeName: 'Chat',
        params: {
          chatroomId,
          title: eventTitle,
          eventId,
          image: eventImage,
          fromEvent: true,
          active,
        },
      }),
    );
  },
});

const mapStateToProps = state => ({
  nav: state.nav,
  chatrooms: state.chatrooms,
  auth: state.auth,
  eventDetails: state.events.eventDetails,
  myDetails: state.users.myDetails,
});

class HeaderContainer extends Component {
  state = {
    showModal: false,
    actions: 'profile',
  };

  render() {
    const { color } = this.props;
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 24;
    let borderBottomWidth = 0.5;
    let backgroundColor;

    switch (color) {
      case 'dark':
        backgroundColor = colors.DARK_BLUE;
        break;
      case 'light':
        backgroundColor = '#F7F7F7';
        break;
      case 'transparent':
        backgroundColor = 'transparent';
        borderBottomWidth = 0;
    }

    return (
      <View
        style={[
          {
            width: Dimensions.get('window').width,
            paddingTop: STATUSBAR_HEIGHT,
            position: 'absolute',
            top: 0,
            borderBottomColor: headerPalette.colors.HEADER_BORDER_BOTTOM,
          },
          { backgroundColor, borderBottomWidth },
        ]}
      >
        <Header
          leftComponent={this.getLeftComponent(this.props.left)}
          rightComponent={this.getRightComponent(this.props.right)}
          title={this.props.title}
          titleComponent={this.props.titleComponent}
          color={backgroundColor}
        />
        <ActionsModal
          actions={this.state.actions}
          visible={this.state.showModal}
          close={() => this.setState({ showModal: false })}
        />
      </View>
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

      case 'profile':
        const { myDetails } = this.props;
        const hasUnseenTags = myDetails && myDetails.data.hasUnseenTags;
        return (
          <WithNotificationIcon hasNotification={hasUnseenTags}>
            <Button
              icon={
                <Icon name={'md-more'} color={colors.DUST_WHITE} size={26} />
              }
              type="grayFloatingButton"
              header
              customStyle={{ width: 30, height: 30 }}
              onPress={() =>
                this.setState({ showModal: true, actions: 'profile' })
              }
            />
          </WithNotificationIcon>
        );

      case 'people-profile':
        return (
          <Button
            icon={<Icon name={'md-more'} color={colors.DUST_WHITE} size={26} />}
            type="floatingButton"
            header
            customStyle={{ width: 30, height: 30 }}
            onPress={() =>
              this.setState({ showModal: true, actions: 'settings' })
            }
          />
        );

      case 'event-chat':
        const eventDetails = this.props.nav.routes.find(
          x => x.routeName === 'EventDetails',
        );
        if (
          !this.props.nav.isTransitioning &&
          eventDetails &&
          eventDetails.params.userParticipate &&
          eventDetails.params.active
        ) {
          const {
            chatroomId,
            title,
            id,
            eventImage,
            active,
          } = this.props.eventDetails;
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
                this.props.openChat(chatroomId, title, id, eventImage, active);
              }}
            />
          );
        }
        break;

      case 'chat':
        if (!this.props.nav.isTransitioning) {
          const {
            isEventChatroom,
            active,
            participantId,
            eventId,
            image,
            title,
            fromEvent,
            fromProfile,
          } = this.props.nav.routes[this.props.nav.index].params;

          let formattedTitle = title;

          if (formattedTitle && formattedTitle.length > 20) {
            formattedTitle = formattedTitle.substring(0, 20);
            formattedTitle += '...';
          }

          return (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              disabled={fromEvent || fromProfile || !active}
              onPress={() => {
                isEventChatroom
                  ? this.props.openEvent(eventId, active)
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
                {formattedTitle}
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
