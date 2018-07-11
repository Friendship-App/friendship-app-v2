import {StyleSheet} from 'react-native';
import {colors, fonts, paddings} from "../../styles";

export default StyleSheet.create({
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: colors.DARK_BLUE,
    marginHorizontal: paddings.LG,
    marginVertical: paddings.MD,
  },
  field: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 18
  }
})