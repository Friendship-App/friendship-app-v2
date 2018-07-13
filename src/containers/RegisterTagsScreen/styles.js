import {StyleSheet} from 'react-native';
import {colors, fonts, fontSizes, paddings, styles} from "../../styles";

export default StyleSheet.create({
  tagsScreen: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.DARK_BLACK,
  },
  next: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DARK_BLACK
  },
  title: {
    width: '100%',
    fontFamily: 'Friendship_version_2',
    fontSize: fontSizes.HEADING_2,
    color: colors.DUST_WHITE,
    textAlign: 'justify',
    marginLeft: paddings.LG,
    paddingVertical: paddings.MD
  },
  yeah: {
    color: colors.DARK_BLUE
  },
  nah: {
    color: colors.ORANGE
  }
})