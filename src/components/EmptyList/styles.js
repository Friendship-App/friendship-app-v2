import { StyleSheet } from 'react-native';
import { colors, fonts, paddings } from '../../styles';

export default StyleSheet.create({
  emptyChat: {
    flex: 1,
    backgroundColor: colors.DUST_WHITE,
    padding: paddings.MD,
  },
  emptyEvent: {
    flex: 1,
    backgroundColor: colors.MEDIUM_GREY,
    padding: paddings.MD,
  },
  title: {
    fontFamily: fonts.BOLD,
  },
  message: {
    paddingBottom: paddings.MD,
  },
  redirect: {
    textDecorationLine: 'underline',
    color: colors.ORANGE,
  },
});
