import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';
import { colors, paddings } from '../../styles';

const styles = StyleSheet.create({
  contentContainerStyle: {
    minHeight: '100%',
    justifyContent: 'center',
    /*commented otherwise roundTab is not at the bottom
      paddingVertical: 10

      */
  },
  contentContainerStyleTop: {
    minHeight: '100%',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
});

export const ViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: styles.contentContainerStyle,
})`
  background-color: #2a343c;
`;

export const ViewContainerLight = styled.ScrollView.attrs({
  contentContainerStyle: styles.contentContainerStyle,
})`
  background-color: #ffffff;
`;

export const ViewContainerTop = styled.ScrollView.attrs({
  contentContainerStyle: styles.contentContainerStyleTop,
})`
  background-color: #ffffff;
`;

export const HeaderButton = styled.View`
  position: absolute;
  top: 10;
  right: 40;
`;

export const Padding = styled.View`
  padding: 16px;
`;

export const Centered = styled.View`
  align-items: center;
  justify-content: center;
`;

export const FullscreenCentered = styled(Centered)`
  flex: 1;
  flex-direction: row;
`;

export const FlexRow = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const AppContainer = styled.View`
  flex: 1;
`;

export const IconImage = styled.Image`
  width: 20;
  height: 20;
  ${props => (props.tintColor ? `tintColor: ${props.tintColor}` : undefined)};
`;

export const DescriptionWrapper = styled.View`
  background-color: #f9f6f1;
  width: ${Dimensions.get('window').width};
  display: flex;
  align-items: center;
  padding-vertical: 14px;
  padding-horizontal: ${paddings.LG};
`;

export const PopUpMenuCard = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  align-self: flex-end;
  padding-top: 0px;
`;

export const ProfileContainer = styled.ScrollView`
  flex: 1;
`;

export const EventContainer = styled.ScrollView`
  flex: 1;
`;

export const SignUpWrapper = styled.View`
  flex: 1;
  background-color: #efebe9;
  align-items: center;
`;
