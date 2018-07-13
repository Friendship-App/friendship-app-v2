import {StyleSheet} from 'react-native';
import {colors, fontSizes, paddings} from "../../styles";

export default StyleSheet.create({
  bubbleTextInput: {
    minHeight: 150,
    maxHeight: 300,
    backgroundColor: colors.WHITE,
    borderRadius: 33,
    paddingTop: paddings.XS,
    paddingBottom: paddings.XS,
    paddingHorizontal: paddings.SM,
    fontSize: fontSizes.SMALL,
  }
})