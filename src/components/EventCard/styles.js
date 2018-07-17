import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';

export default StyleSheet.create({
  locationText: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.SMALL,
    color: 'black',
  },
  eventCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: paddings.SM,
    marginBottom: 20,
  },
  titleTextStyle: {
    fontSize: fontSizes.HEADING_4,
    fontFamily: 'NunitoSans-Bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionTextStyle: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: fontSizes.REGULAR,
    color: '#9d9fa9',
  },
  cardSection: {
    paddingHorizontal: paddings.MD,
    paddingVertical: paddings.SM,
    backgroundColor: colors.DUST_WHITE,
    justifyContent: 'space-between',
  },
});
