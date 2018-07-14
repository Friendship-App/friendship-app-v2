import React from 'react';
import {createStackNavigator} from 'react-navigation';
import InboxScreen from "../../containers/InboxScreen";
import {fonts} from "../../styles";

const InboxStack = createStackNavigator({
  Inbox: {
    screen: InboxScreen,
    navigationOptions: {
      title: 'Inbox',
      headerTitleStyle: {
        fontFamily: fonts.SEMI_BOLD
      }
    }
  }
});

export default InboxStack;