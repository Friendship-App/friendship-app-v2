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

import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';

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
      header: null,
      tabBarVisible: false,
    },
  },
  EventForm: {
    screen: EventFormScreen,
    navigationOptions: {
      tabBarVisible: false,
    },
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
