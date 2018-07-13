import {StyleSheet} from 'react-native';
import {colors, fonts, fontSizes, paddings} from "../../styles";

export default StyleSheet.create({
  next: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DARK_BLACK
  },
  icon: {
    paddingBottom: paddings.XXS
  },
  message: {
    color: colors.DUST_WHITE, fontFamily: fonts.REGULAR, fontSize: fontSizes.BODY_TEXT
  }
})