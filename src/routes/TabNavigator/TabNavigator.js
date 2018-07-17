import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import People from '../PeopleStack';
import Events from '../EventsStack';
import Inbox from '../InboxStack';
import Profile from '../ProfileStack';
import { colors } from '../../styles';
import TabIcons from '../../../assets/tabIcons';
import { Image } from 'react-native';

const TabNavigator = createBottomTabNavigator(
  {
    People,
    Events,
    Inbox,
    Profile,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = TabIcons[routeName];
        return (
          <Image
            source={iconName}
            style={[{ tintColor, height: 20, width: 20 }]}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.ORANGE,
      inactiveTintColor: colors.DARK_BLACK,
    },
  },
);

export default TabNavigator;
