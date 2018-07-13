import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {colors} from '../../styles';
import {disableTouchableOpacity} from "../../actions/TouchableOpacityController";

class Button extends Component {
  state = {
    disabled: false
  };

  render() {
    const { type, text, width, onPress, header, color } = this.props;

    let style;
    let backgroundColor;
    switch (type) {
      case 'primary':
        style = styles.button;
        backgroundColor = colors.DUST_WHITE;
        break;
      case 'secondary':
        style = header ? styles.headerButton : styles.buttonSecondary;
        break;
      case 'floatingButton':
        style = styles.floatingButton;
        backgroundColor = colors.ORANGE;
        break;
    }

    let buttonTextColor;
    switch (color) {
      case 'orange':
        buttonTextColor = colors.ORANGE;
        break;
      case 'white':
        buttonTextColor = colors.DUST_WHITE;
        break;
    }

    let buttonWidth;
    switch (width) {
      case 'sm':
        buttonWidth = 100;
        break;
      case 'md':
        buttonWidth = 150;
        break;
      case 'xl':
        buttonWidth = 200;
        break;
      case 'noFixedWidth':
        break;
    }

    const handlePress = () => {
      disableTouchableOpacity(this);
      onPress();
    };

    return (
      <TouchableOpacity
        style={[style, { width: buttonWidth, backgroundColor }]}
        onPress={handlePress}
        disabled={this.state.disabled}
      >
        {this.props.icon ? (
          this.props.icon
        ) : (
          <Text style={[styles.text, { color: buttonTextColor }]}>{text}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  width: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  text: 'A Button',
  type: 'primary',
  width: 'noFixedWidth',
  color: 'orange',
  onPress: () => {},
};

export default Button;
