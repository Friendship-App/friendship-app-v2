import {StyleSheet} from 'react-native';
import {colors, fonts, paddings} from "../../styles";

export default StyleSheet.create({
  textInput: {
    marginHorizontal: paddings.LG,
    marginVertical: paddings.MD,
  },
  horizontalLine: {
    borderBottomWidth: 2,
    borderBottomColor: colors.DARK_BLUE,
  },
  field: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 18
  },
  helperText: {
    fontFamily: fonts.LIGHT,
  }
})