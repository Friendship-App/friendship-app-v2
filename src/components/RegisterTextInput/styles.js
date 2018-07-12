import {StyleSheet} from 'react-native';
import {colors, fonts, fontSizes, paddings} from "../../styles";

export default StyleSheet.create({
  textInput: {
    marginHorizontal: paddings.LG,
    marginVertical: paddings.MD,
  },
  horizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: colors.DARK_BLACK,
  },
  field: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 18
  },
  helperText: {
    fontFamily: fonts.LIGHT,
  },
  warning: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: fontSizes.SMALL,
    color: colors.WARNING,
    alignSelf: 'center'
  }
})