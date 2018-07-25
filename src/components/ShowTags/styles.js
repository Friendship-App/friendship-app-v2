import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.LIGHT_GREY,
    paddingBottom: paddings.LG,
  },
  picker: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    paddingTop: paddings.XS,
  },
  loveAndHatePicker: {
    flex: 1,
    paddingBottom: paddings.XXS,
    paddingTop: paddings.XS,
    marginHorizontal: paddings.LG,
  },
  loveAndHatePickerText: {
    textAlign: 'center',
    fontFamily: fonts.TITLE,
    fontSize: fontSizes.HEADING_3,
    letterSpacing: 3.2,
  },
  tagList: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 22,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  noTagsMessage: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: colors.DARK_BLACK,
    fontSize: 13,
    paddingTop: paddings.XS,
    paddingBottom: paddings.SM,
  },
  tagsContainer: {
    paddingTop: paddings.XXS,
  },
});
