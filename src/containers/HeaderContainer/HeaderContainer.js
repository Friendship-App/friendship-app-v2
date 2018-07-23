import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, headerPalette, paddings } from '../../styles';
import TabIcons from '../../../assets/tabIcons';
import { IconImage } from '../../components/Layout/Layout';
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
        return (
          <Button
            icon={<Icon name={'md-more'} color={colors.DUST_WHITE} size={26} />}
            type="floatingButton"
            header
            customStyle={{ width: 30, height: 30 }}
            onPress={() => this.setState({ showModal: true })}
          />
        );

      case 'people-profile':
        return (
          <Button
            icon={<Icon name={'md-more'} color={colors.DUST_WHITE} size={26} />}
            type="floatingButton"
            header
            customStyle={{ width: 30, height: 30 }}
            onPress={() => console.log('show modal please...')}
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
                  ? this.props.openEvent(eventId)
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
