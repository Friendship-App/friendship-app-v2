import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import styles from './styles';
import { colors } from '../../styles';

class Header extends Component {
  render() {
    const {
      color,
      leftComponent,
      rightComponent,
      title,
      titleComponent,
    } = this.props;

    let backgroundColor;
    let borderBottomWidth = 0.5;
    switch (color) {
      case 'dark':
        backgroundColor = colors.DARK_BLUE;
        break;
      case 'light':
        backgroundColor = '#F7F7F7';
        break;
      case 'transparent':
        backgroundColor = 'transparent';
        borderBottomWidth = 0;
    }

    return (
      <View style={[styles.container, { backgroundColor, borderBottomWidth }]}>
        <View style={[styles.header, { backgroundColor }]}>
          {leftComponent}
          <Text>{title}</Text>
          {titleComponent}
          {rightComponent}
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  color: PropTypes.string,
  leftComponent: PropTypes.element,
  rightComponent: PropTypes.element,
  title: PropTypes.string,
};

Header.defaultProps = {
  color: 'dark',
};

export default Header;
