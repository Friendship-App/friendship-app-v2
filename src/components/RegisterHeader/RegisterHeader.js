import React from 'react';
import ProgressBar from './ProgressBar';
import {Text, View} from "react-native";
import styles from './styles';
import {colors} from "../../styles";

export default class RegisterHeader extends React.Component {
  render() {
    const {backgroundStyle, headerTitle, processStage} = this.props;
    let backgroundColor = colors.MEDIUM_GREY;
    switch (backgroundStyle) {
      case 'light':
        return '#f9f7f6';
      case 'darkblue':
        return '#2a343c';
    }

    return (
      <View style={[styles.header, {backgroundColor}]}>
        <ProgressBar
          steps={processStage}
          color={backgroundStyle === 'darkblue' ? '#3a4853' : ''}
        />
        <Text style={[styles.title]}>{headerTitle}</Text>
      </View>
    );
  }
}
