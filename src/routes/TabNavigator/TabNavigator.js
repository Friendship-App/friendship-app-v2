import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import People from '../PeopleStack';
import Events from '../EventsStack';
import Inbox from '../InboxStack';
import Profile from '../ProfileStack';
import { colors } from '../../styles';
import TabIcons from '../../../assets/tabIcons';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ chatrooms : state.chatrooms})
class TabIcon extends React.Component {
  render() {
    const { source, style, routeName, chatrooms } = this.props
    if (routeName === 'Inbox') {
      const hasUnread = chatrooms && chatrooms.chatrooms.reduce((acc, room) => acc + Number(room.unreadMessages), 0) > 0
      return (<View>
        {hasUnread && <View style={
          {position: 'absolute',
           top: -3,
           right: -3,
           zIndex: 10,
           backgroundColor: colors.ORANGE,
           width: 10,
           height: 10,
           borderRadius: 5
          }}></View>}
        <Image source={source} style={style} />
      </View>)
    }
    return <Image source={source} style={style} />
  }
}
const TabIconComponent = connect(mapStateToProps)(TabIcon)

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
          <TabIconComponent
            source={iconName}
            routeName={routeName}
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
