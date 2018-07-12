import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../styles';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import wave from '../../../assets/img/curve/curve.png';
import styles from './styles';

class Footer extends Component {
  render() {
    const { children, color, activeOpacity, onPress, secondary, disabled } = this.props;

    let tintColor;

    switch (color) {
      case 'orange':
        tintColor = colors.ORANGE;
        break;
      case 'blue':
        tintColor = colors.DARK_BLACK;
    }

    let footerStyle = secondary ? styles.secondaryFooter : styles.footer;

    return (
      <TouchableOpacity
        style={footerStyle}
        onPress={onPress}
        activeOpacity={activeOpacity}
        disabled={disabled}
      >
        <Image
          source={wave}
          style={[
            styles.footerWave,
            {
              tintColor,
            },
          ]}
        />
        <View
          style={[
            styles.footerContent,
            {
              backgroundColor: tintColor,
            },
          ]}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  }
}

Footer.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
  activeOpacity: PropTypes.number,
  secondary: PropTypes.bool,
};

Footer.defaultProps = {
  color: 'orange',
  onPress: () => {},
  activeOpacity: 1,
  secondary: false,
};

export default Footer;
