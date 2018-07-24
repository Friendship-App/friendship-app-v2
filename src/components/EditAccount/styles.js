import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings, styles } from '../../styles';

export default StyleSheet.create({
  container: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.DUST_WHITE,
  },
  next: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DUST_WHITE,
  },
  title: {
    fontFamily: 'Friendship_version_2',
    fontSize: fontSizes.HEADING_2,
    color: colors.DARK_BLACK,
    textAlign: 'justify',
    paddingLeft: paddings.LG,
    paddingTop: paddings.XL,
    lineHeight: 35,
  },
});
