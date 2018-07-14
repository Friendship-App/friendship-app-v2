import React from 'react';
import {createStackNavigator} from 'react-navigation';
import PeopleScreen from "../../containers/PeopleScreen";
import {fonts} from "../../styles";

const PeopleStack = createStackNavigator({
  People: {
    screen: PeopleScreen,
    navigationOptions: {
      title: 'People',
      headerTitleStyle: {
        fontFamily: fonts.SEMI_BOLD
      },
    }
  }
});

export default PeopleStack;