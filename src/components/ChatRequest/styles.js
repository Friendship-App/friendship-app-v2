import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings, styles } from '../../styles';

export default StyleSheet.create({
  container: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.LIGHT_GREY,
    paddingBottom: paddings.FOOTER,
  },
  scrollview: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: paddings.SM,
  },
  inviteText: {
    fontSize: fontSizes.BODY_TEXT,
    fontFamily: fonts.REGULAR,
    color: colors.DARK_BLACK,
    marginBottom: paddings.LG,
    paddingLeft: paddings.SM,
  },
});
