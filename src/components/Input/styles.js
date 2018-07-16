import { StyleSheet } from 'react-native';
import { colors, fonts, paddings } from '../../styles';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginBottom: paddings.MD
  },
  title: {
    marginLeft: paddings.SM,
    fontFamily: fonts.SEMI_BOLD,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    borderTopWidth: 1,
    borderColor: colors.DARK_BLACK,
    position: 'absolute',
    bottom: 10,
    left: 0,
    marginLeft: paddings.SM,
  },
  textInput: {
    fontFamily: fonts.REGULAR,
    flex: 1,
  },
  input: {
    paddingHorizontal: paddings.SM,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    height: 40,
    backgroundColor: colors.DUST_WHITE,
  },
  passwordIcon: {
    position: 'absolute',
    top: 30,
    right: 15,
  },
});
