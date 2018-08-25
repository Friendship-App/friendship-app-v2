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
import ChatRequestScreen from '../containers/ChatRequestScreen';
import EditTagsScreen from '../containers/EditTagsScreen';
import EditPersonalitiesScreen from '../containers/EditPersonalitiesScreen';
import UpdateEventScreen from '../containers/UpdateEventScreen';
import ReportUserScreen from '../containers/ReportUserScreen';
import ReportEventScreen from '../containers/ReportEventScreen';

const routes = {
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: { header: null },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: { header: null },
  },
  Home: {
    screen: TabNavigator,
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
    navigationOptions: {
      header: <HeaderContainer left={'white-back'} color={'transparent'} />,
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
  EditEvent: {
    screen: UpdateEventScreen,
    navigationOptions: {
      header: <HeaderContainer left={'white-back'} color={'transparent'} />,
    },
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      header: <HeaderContainer left={'back'} color={'light'} right={'chat'} />,
    },
  },
  ChatRequest: {
    screen: ChatRequestScreen,
    navigationOptions: {
      header: <HeaderContainer left={'white-back'} color={'transparent'} />,
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
  EditTags: {
    screen: EditTagsScreen,
    navigationOptions: {
      header: <HeaderContainer left={'white-back'} color={'transparent'} />,
    },
  },
  EditPersonalities: {
    screen: EditPersonalitiesScreen,
    navigationOptions: {
      header: <HeaderContainer left={'white-back'} color={'transparent'} />,
    },
  },
  ReportUser: {
    screen: ReportUserScreen,
    navigationOptions: {
      header: (
        <HeaderContainer
          left={'back'}
          color={'light'}
          title={'Report a user'}
        />
      ),
    },
  },
  ReportEvent: {
    screen: ReportEventScreen,
    navigationOptions: {
      header: (
        <HeaderContainer
          left={'back'}
          color={'light'}
          title={'Report an event'}
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
  Tags: {
    screen: RegisterTagsScreen,
    navigationOptions: { header: null },
  },
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
