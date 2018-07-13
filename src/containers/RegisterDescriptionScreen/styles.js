import {StyleSheet} from 'react-native';
import {colors, fonts, fontSizes, paddings, styles} from "../../styles";

export default StyleSheet.create({
  descriptionScreen: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.DUST_WHITE,
    paddingBottom: paddings.FOOTER
  },
  description: {
    paddingHorizontal: paddings.LG,
  },
  title: {
    fontFamily: fonts.REGULAR,
    fontSize: fontSizes.SMALL,
    marginBottom: paddings.SM
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