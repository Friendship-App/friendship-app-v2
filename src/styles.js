import { Platform, View } from 'react-native';
import React from 'react';

export const colors = {
  DUST_WHITE: '#F9F7F6',
  LIGHT_BLACK: '#839297',
  MEDIUM_BLACK: '#314A52',
  DARK_BLACK: '#2a343c',
  LIGHT_GREY: '#EFEBE9',
  MEDIUM_GREY: '#DAD5D2',
  DARK_GREY: '#B3ABAB',
  LIGHT_ORANGE: '#FFAB91',
  ORANGE: '#ff8a65',
  DARK_ORANGE: '#FF6E40',
  LIGHT_BLUE: '#ADD6FF',
  BLUE: '#99ccff',
  DARK_BLUE: '#8FBAF3',
  BEIGE: '#faf6f0',
  BLACK: '#3b3b3d',
  PLACEHOLDER: 'rgba(44, 66, 88, 0.3)',
  WARNING: 'red',
};

export const fonts = {
  REGULAR: 'NunitoSans-Regular',
  LIGHT_BOLD: 'NunitoSans-Bold',
  SEMI_BOLD: 'NunitoSans-SemiBold',
  BOLD: 'NunitoSans-ExtraBold',
  ITALIC: 'NunitoSans-LightItalic',
  LIGHT: 'NunitoSans-Light',
  TITLE: 'Friendship_version_2',
};

export const fontSizes = {
  WELCOME_MESSAGE: 80,
  WELCOME_SUBS: 25,
  TITLE: 50,
  HEADING_1: 55,
  HEADING_2: 45,
  HEADING_3: 35,
  HEADING_4: 25,
  BODY_TEXT: 16,
  SMALL: 15,
  MEDIUM_SMALL: 12,
  EXTRA_SMALL: 10,
  QUOTE: 20,
};

export const paddings = {
  HEADER: 35,
  FOOTER: 100,
  XXL: 80,
  XL: 50,
  LG: 30,
  MD: 20,
  SM: 15,
  XS: 10,
  XXS: 5,
};

export const styles = {
  rootContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 24,
  },
};

export const footerText = {
  fontFamily: fonts.REGULAR,
  fontSize: fontSizes.BODY_TEXT,
  color: colors.DUST_WHITE,
};
