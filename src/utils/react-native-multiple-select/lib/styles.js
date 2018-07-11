/*!
 * react-native-multi-select
 * Copyright(c) 2017 Mustapha Babatunde Oluwaleke
 * MIT Licensed
 */
import {Dimensions} from 'react-native';

export const InputTitle = {
  fontWeight: '600',
  width: 100,
  height: 25,
  fontFamily: 'NunitoSans-Regular',
  fontSize: 13,
  letterSpacing: 1.5,
  textAlign: 'left',
  paddingLeft: 30,
  marginBottom: 16,
  width: '100%',
};

export const colorPack = {
  primary: '#00A5FF',
  primaryDark: '#215191',
  light: '#faf5f0',
  textPrimary: '#525966',
  placeholderTextColor: '#A9A9A9',
  danger: '#C62828',
  borderColor: '#e9e9e9',
  backgroundColor: '#b1b1b1',
};

export default {
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  footerWrapperNC: {
    //width: 320,
    flexDirection: 'column',
  },
  subSection: {
    backgroundColor: colorPack.light,
    borderBottomWidth: 1,
    borderColor: colorPack.borderColor,
    paddingLeft: 20,
    paddingRight: 20,
    width: Dimensions.get('window').width - 40,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,

    borderRadius: 27,
  },
  greyButton: {
    height: 40,
    elevation: 0,
    backgroundColor: colorPack.backgroundColor,
  },
  indicator: {
    fontSize: 30,
    color: colorPack.placeholderTextColor,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    margin: 3,
    borderWidth: 2,
  },
  button: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#2d4359',
    fontSize: 14,
  },
  selectorView: fixedHeight => {
    const style = {
      flexDirection: 'column',
      marginBottom: 10,
      elevation: 2,
      width: Dimensions.get('window').width - 40,
      marginLeft: 20,
    };
    if (fixedHeight) {
      style.height = 400;
    }
    return style;
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingLeft: 10,
    backgroundColor: colorPack.light,
    borderRadius: 27,
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    zIndex: 33,
    marginBottom: 10,
  },
};
