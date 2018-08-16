import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings, styles } from '../../styles';

export default StyleSheet.create({
  container: {
    ...styles.rootContainer,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.DUST_WHITE,
  },
  title: {
    fontFamily: 'Friendship_version_2',
    fontSize: fontSizes.HEADING_2,
    color: colors.DARK_BLACK,
    textAlign: 'left',
    paddingLeft: paddings.LG,
    paddingTop: paddings.XL,
    lineHeight: 35,
    backgroundColor: colors.DUST_WHITE,
    width: '100%',
  },
  twoPersonalitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: paddings.SM,
  },
  next: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DUST_WHITE,
  },
});
