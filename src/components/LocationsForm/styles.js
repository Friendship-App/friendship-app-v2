import {StyleSheet} from 'react-native';
import {colors, fonts, fontSizes, paddings, styles} from "../../styles";

export default StyleSheet.create({
  locationsForm: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.LIGHT_GREY,
    paddingBottom: paddings.FOOTER
  },
  next: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DUST_WHITE
  },
  message: {
    paddingHorizontal: paddings.LG,
    marginVertical: paddings.LG
  },
  text: {
    fontFamily: fonts.LIGHT,
    fontSize: fontSizes.BODY_TEXT
  },
  warning: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: fontSizes.SMALL,
    color: colors.WARNING,
    alignSelf: 'center'
  }
})