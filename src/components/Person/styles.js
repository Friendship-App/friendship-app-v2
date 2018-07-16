import {Dimensions, StyleSheet, Platform} from 'react-native';
import {colors, fonts, fontSizes, paddings} from "../../styles";

export default StyleSheet.create({
  locationText: {
    textAlign: 'left',
    color: colors.DUST_WHITE,
    fontFamily: fonts.BOLD,
    fontSize: fontSizes.SMALL
  },
  yeahText: {
    color: colors.DARK_BLUE,
    fontFamily: fonts.BOLD,
  },
  nahText: {
    color: colors.ORANGE,
    fontFamily: fonts.BOLD,
  },
  nah: {color: colors.ORANGE},
  friendshipFont: {
    fontFamily: fonts.TITLE,
  },
  compatibilityText: {
    marginBottom: paddings.XS,
    fontFamily: fonts.REGULAR,
    fontSize: fontSizes.SMALL,
    color: colors.DARK_BLACK,
  },
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: paddings.SM
  },
  peoplePicture: {
    flex: 1,
  },
  viewBottom: {
    flex: 1,
    flexDirection: 'column'
  },
  flexRow: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textName: {
    color: colors.DARK_BLACK,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 24,
  },
  textDetails: {
    color: colors.DARK_BLACK,
    fontSize: fontSizes.SMALL,
    marginTop: paddings.XXS
  },
  topPart: {
    flex: 6,
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width - 70,
    borderRadius: 3,
  },
  topText: {
    color: 'white',
    maxHeight: 140,
    marginTop: 23,
    marginHorizontal: 20,
  },

  bottomPart: {
    width: Dimensions.get('window').width - 70,
    flex: 5,
    padding: paddings.SM,
    backgroundColor: colors.DUST_WHITE,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  whiteCircle: {
    width: 50,
    height: 50,
  },
  avatar: {
    backgroundColor: 'transparent',
    marginTop: 7,
    fontSize: Platform.OS === 'android' ? 35 : 45,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0,
    height: 70,
    backgroundColor: '#efebe9',
    width: Dimensions.get('window').width - 50,
    marginBottom: 5,
  },
  listName: {
    justifyContent: 'flex-start',
    fontSize: 20,
    fontWeight: '400',
  },
  listEmoji: {
    margin: 5,
    marginHorizontal: 10,
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
});