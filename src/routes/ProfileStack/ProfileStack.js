import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProfileScreen from '../../containers/ProfileScreen';
import HeaderContainer from '../../containers/HeaderContainer/HeaderContainer';

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: <HeaderContainer right="profile" color="transparent" />,
      // headerTransparent: true,
      // headerStyle: { borderBottomColor: 'transparent' },
    },
  },
});

export default ProfileStack;
