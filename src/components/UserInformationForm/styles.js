import {StyleSheet} from 'react-native';
import {colors, fonts, fontSizes, styles} from "../../styles";

export default StyleSheet.create({
  userInformationForm: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.LIGHT_GREY
  },
  next: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DUST_WHITE
  },
  warning: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: fontSizes.SMALL,
    color: colors.WARNING,
    alignSelf: 'center'
  }
})