import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';

export default StyleSheet.create({
  header: {
    fontFamily: fonts.TITLE,
    color: colors.DUST_WHITE,
    fontSize: fontSizes.HEADING_2,
    paddingBottom: paddings.MD,
  },
  action: {
    fontFamily: fonts.REGULAR,
    color: colors.DUST_WHITE,
    fontSize: fontSizes.BODY_TEXT,
  },
});
