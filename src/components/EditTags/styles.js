import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings, styles } from '../../styles';

export default StyleSheet.create({
  container: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  scrollview: {
    flex: 1,
    backgroundColor: colors.DARK_BLACK,
  },
  title: {
    fontFamily: fonts.TITLE,
    fontSize: fontSizes.HEADING_3,
    color: colors.DUST_WHITE,
    textAlign: 'left',
    marginLeft: paddings.LG,
    paddingTop: paddings.XL,
  },
  yeah: {
    color: colors.DARK_BLUE,
  },
  nah: {
    color: colors.ORANGE,
  },
  next: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DUST_WHITE,
  },
});
