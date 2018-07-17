import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';
import People from '../PeopleStack';
import Events from '../EventsStack';
import Inbox from '../InboxStack';
import Profile from '../ProfileStack';
import { colors } from '../../styles';
import TabIcons from '../../../assets/tabIcons';
import { Image } from 'react-native';
import { fetchUserTags } from '../../actions/tags';
import { fetchUserPersonalities } from '../../actions/personalities';
import { fetchUserInformation } from '../../actions/users';

const TabNavigator = createBottomTabNavigator(
  {
    People,
    Events,
    Inbox,
    Profile: {
      screen: Profile,
      // navigationOptions: ({ navigation }) => ({
      //   tabBarOnPress: () => {
      //     navigation.dispatch(fetchUserInformation());
      //     navigation.dispatch(fetchUserTags());
      //     navigation.dispatch(fetchUserPersonalities());
      //     navigation.dispatch(
      //       NavigationActions.navigate({ routeName: 'Profile' }),
      //     );
      //   },
      // }),
    },
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
