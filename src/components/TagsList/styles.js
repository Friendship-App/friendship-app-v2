import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';

export default StyleSheet.create({
  tagsList: {
    backgroundColor: colors.DARK_BLACK,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontFamily: fonts.BOLD,
    fontSize: fontSizes.HEADING_4,
    color: colors.DUST_WHITE,
  },
  tagTitle: {
    color: colors.DUST_WHITE,
    marginLeft: paddings.SM,
    fontSize: fontSizes.HEADING_4,
    marginTop: paddings.SM,
  },
});
