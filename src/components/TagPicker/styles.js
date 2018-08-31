import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';

export default StyleSheet.create({
  tag: {
    height: 90,
    width: '100%',
    marginTop: paddings.SM,
    flexDirection: 'row',
    paddingHorizontal: paddings.SM,
    zIndex: 10,
  },
  icon: {
    height: 60,
    width: 60,
  },
  tagText: {
    fontFamily: fonts.REGULAR,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.DUST_WHITE,
    textAlign: 'center',
  },
  tagPart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  yeahIcon: {
    justifyContent: 'flex-start',
  },
  nahIcon: {
    justifyContent: 'flex-end',
  },
});
