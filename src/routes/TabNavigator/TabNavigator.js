import React from 'react';
import {createBottomTabNavigator} from "react-navigation";
import People from '../../containers/PeopleScreen';
import Events from '../../containers/EventsScreen';
import Inbox from '../../containers/InboxScreen';
import Profile from '../../containers/ProfileScreen';
import {colors} from "../../styles";

const TabNavigator = createBottomTabNavigator({
  People,
  Events,
  Inbox,
  Profile
},{
  tabBarOptions: {
    activeTintColor: colors.ORANGE,
    inactiveTintColor: colors.DARK_GREY,
  },
});

export default TabNavigator;