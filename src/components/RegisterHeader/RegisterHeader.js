import React from 'react';
import ProgressBar from './ProgressBar';
import {Text, View} from "react-native";
import styles from './styles';
import {colors} from "../../styles";

export default class RegisterHeader extends React.Component {
  render() {
    const {backgroundStyle, headerTitle, processStage} = this.props;
    let backgroundColor = colors.DUST_WHITE;
    let color = colors.LIGHT_BLACK;
    switch (backgroundStyle) {
      case 'grey':
        backgroundColor = colors.LIGHT_GREY;
        break;
      case 'dark':
        backgroundColor = colors.DARK_BLACK;
        color = colors.DUST_WHITE;
        break;
    }

    return (
      <View style={[styles.header, {backgroundColor}]}>
        <ProgressBar
          steps={processStage}
          color={backgroundStyle === 'dark' ? '#3a4853' : ''}
        />
        <Text style={[styles.title, {color}]}>{headerTitle}</Text>
      </View>
    );
  }
}
