import React from 'react';
import { View } from 'react-native';
import { colors } from '../styles';

export default class WithNotificationIcon extends React.Component {
  render() {
    const { children, hasNotification } = this.props;
    return (
      <View>
        {hasNotification && (
          <View
            style={{
              position: 'absolute',
              top: -3,
              right: -3,
              zIndex: 10,
              backgroundColor: colors.ORANGE,
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
        )}
        {children}
      </View>
    );
  }
}
