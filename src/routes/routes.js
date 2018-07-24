import WelcomeScreen from '../containers/WelcomeScreen';
import TabNavigator from './TabNavigator';
import RegisterDescriptionScreen from '../containers/RegisterDescriptionScreen';
import RegisterUserInformationScreen from '../containers/RegisterUserInformationScreen';
import RegisterLocationsScreen from '../containers/RegisterLocationsScreen';
import RegisterConfirmationScreen from '../containers/RegisterConfirmationScreen';
import RegisterTagsScreen from '../containers/RegisterTagsScreen';
import RegisterPersonalitiesScreen from '../containers/RegisterPersonalitiesScreen';
import LoginScreen from '../containers/LoginScreen';
import PeopleProfileScreen from '../containers/PeopleProfileScreen';
import EventFormScreen from '../containers/EventFormScreen';
import EventDetailsScreen from '../containers/EventDetailsScreen';
import ChatScreen from '../containers/ChatScreen';

import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import EditProfileScreen from '../containers/EditProfileScreen';
import EditAccountScreen from '../containers/EditAccountScreen';

const routes = {
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: { header: null },
  },
  Home: {
    screen: TabNavigator,
    navigationOptions: { header: null },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: { header: null },
  },
  PeopleProfile: {
    screen: PeopleProfileScreen,
    navigationOptions: {
      header: (
        <HeaderContainer
          right="people-profile"
          left="white-back"
          color="transparent"
        />
      ),
    },
  },
  EventForm: {
    screen: EventFormScreen,
    navigationOptions: {},
  },
  EventDetails: {
    screen: EventDetailsScreen,
    navigationOptions: {
      header: (
        <HeaderContainer
          left={'white-back'}
          right={'event-chat'}
          color={'transparent'}
        />
      ),
    },
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      header: <HeaderContainer left={'back'} color={'light'} right={'chat'} />,
    },
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      header: <HeaderContainer left={'white-back'} color={'transparent'} />,
    },
  },
  EditAccount: {
    screen: EditAccountScreen,
    navigationOptions: {
      header: <HeaderContainer left={'white-back'} color={'transparent'} />,
    },
  },

  // Registration Process
  Locations: {
    screen: RegisterLocationsScreen,
    navigationOptions: { header: null },
  },
  UserInformation: {
    screen: RegisterUserInformationScreen,
    navigationOptions: { header: null },
  },
  Personalities: {
    screen: RegisterPersonalitiesScreen,
    navigationOptions: { header: null },
  },
  Tags: { screen: RegisterTagsScreen, navigationOptions: { header: null } },
  Description: {
    screen: RegisterDescriptionScreen,
    navigationOptions: { header: null },
  },
  Registered: {
    screen: RegisterConfirmationScreen,
    navigationOptions: { header: null },
  },
};

export default routes;
