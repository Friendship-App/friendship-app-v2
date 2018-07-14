import React from 'react';
import {createStackNavigator} from 'react-navigation';
import EventsScreen from "../../containers/EventsScreen";
import {fonts} from "../../styles";

const EventsStack = createStackNavigator({
  Events: {
    screen: EventsScreen,
    navigationOptions: {
      title: 'Events',
      headerTitleStyle: {
        fontFamily: fonts.SEMI_BOLD
      }
    }
  }
});

export default EventsStack;