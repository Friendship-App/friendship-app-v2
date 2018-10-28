import styled from 'styled-components/native';
import { colors, fonts, fontSizes } from '../../styles';

export const Text = styled.Text`
  color: #4b5c5d;
`;
export const Bold = styled(Text)`
  font-weight: bold;
`;

export const CenteredText = styled(Bold)`
  text-align: center;
`;

export const Description = styled.Text`
  font-family: 'NunitoSans-Light';
  font-size: ${fontSizes.BODY_TEXT};
  letter-spacing: 0.4;
  font-weight: 300;
  text-align: center;
  color: #4a4a4a;
`;

export const BoldDescription = styled.Text`
  font-family: 'NunitoSans-Bold';
  font-size: 18px;
  line-height: 24;
  letter-spacing: 0.4;
  text-align: center;
  color: #fff;
`;

export const Details = styled.Text`
  font-family: 'NunitoSans-Regular';
  font-size: 16px;
  line-height: 24;
  font-weight: 300;
  text-align: center;
  color: #4a4a4a;
  margin-bottom: 12px;
  background-color: transparent;
`;

export const CompatibilityText = styled.Text`
  font-family: ${fonts.REGULAR};
  font-size: ${fontSizes.SMALL};
  color: ${colors.DARK_BLACK};
  margin-bottom: 14px;
  background-color: transparent;
`;

export const UsernameText = styled.Text`
  background-color: transparent;
  font-family: ${fonts.REGULAR};
  font-size: ${fontSizes.HEADING_4};
  text-align: center;
  color: ${colors.DARK_BLACK};
`;

export const EventTitleText = styled.Text`
  background-color: transparent;
  font-family: 'NunitoSans-Bold';
  font-size: 25;
  letter-spacing: 2;
  text-align: center;
  color: #60686d;
`;

export const YeahColor = styled.Text`
  color: ${colors.DARK_BLUE};
  font-family: 'NunitoSans-Bold';
`;

export const NaahColor = styled.Text`
  color: ${colors.ORANGE};
  font-family: 'NunitoSans-Bold';
`;

export const LocationText = styled.Text`
  font-family: 'NunitoSans-Bold';
  font-size: 14px;
`;

export const FrienshipFont = styled.Text`
  font-family: ${fonts.TITLE};
  color: ${colors.DARK_BLUE};
`;

export const FrienshipFontNah = styled.Text`
  font-family: ${fonts.TITLE};
  color: ${colors.ORANGE};
`;
