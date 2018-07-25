import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY,
  },
  descriptionContainer: {
    backgroundColor: colors.DUST_WHITE,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: paddings.SM,
    paddingHorizontal: paddings.LG,
  },
  descriptionText: {
    fontFamily: fonts.LIGHT,
    fontSize: fontSizes.BODY_TEXT,
    textAlign: 'center',
  },
  personalitiesContainer: {
    flexDirection: 'row',
    backgroundColor: colors.DUST_WHITE,
    paddingVertical: paddings.SM,
    paddingHorizontal:
      Dimensions.get('window').width <= 320 ? paddings.XS : paddings.MD,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderBottomWidth: 4,
    borderBottomColor: colors.MEDIUM_GREY,
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
    backgroundColor: colors.DUST_WHITE,
    marginBottom: paddings.MD,
  },
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
    color: colors.DARK_BLACK,
  },
});
