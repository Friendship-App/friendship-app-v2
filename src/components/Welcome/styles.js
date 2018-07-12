import {StyleSheet} from 'react-native';
import {colors, styles} from "../../styles";

export default StyleSheet.create({
  welcome: {
    ...styles.rootContainer,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DARK_BLACK
  }
})