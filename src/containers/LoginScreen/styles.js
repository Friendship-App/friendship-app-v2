import { StyleSheet } from 'react-native';
import {
  colors,
  fonts,
  fontSizes,
  footerText,
  paddings,
} from '../../styles';

export default StyleSheet.create({
  statusTextStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: fontSizes.BODY_TEXT,
    textAlign: 'center',
    color: '#f673f7',
    marginTop: 20,
  },
  footerText,
  container: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    paddingHorizontal: paddings.MD,
    justifyContent: 'center',
  },
  keyboardView: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.DARK_BLACK
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: paddings.LG
  }
});
