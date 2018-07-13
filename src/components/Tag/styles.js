import {StyleSheet} from 'react-native';
import {colors, fonts, fontSizes, paddings} from "../../styles";

export default StyleSheet.create({
  tag: {
    height: 90,
    width: '100%',
    marginTop: paddings.MD,
    flexDirection: 'row',
    paddingHorizontal: paddings.SM,
    zIndex: 10,
  },
  icon: {
    height: 70,
    width: 70,
  },
  tagText: {
    fontFamily: fonts.REGULAR,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DUST_WHITE,
  },
  tagPart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  yeahIcon: {
    justifyContent: 'flex-start',
  },
  nahIcon: {
    justifyContent: 'flex-end',
  },
})