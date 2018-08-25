import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings, styles } from '../../styles';

export default StyleSheet.create({
  container: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  next: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DUST_WHITE,
  },
});
