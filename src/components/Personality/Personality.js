import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, fonts, fontSizes, paddings } from '../../styles';
import personalities from '../../../assets/img/personalities';
import styles from './styles';

const Personality = props => {
  const { personality, small, edit, selected, onPress } = props;
  const imgStyle = small ? styles.smallImage : styles.image;
  let img = personality
    .toLowerCase()
    .trim()
    .replace(/-/g, '')
    .replace(' ', '');
  return (
    <View
      style={{
        alignItems: 'center',
        paddingRight: props.isLast ? 0 : paddings.SM,
        minWidth: 90,
        paddingBottom: small ? 0 : paddings.SM,
      }}
    >
      {edit && selected ? (
        <Icon
          name="md-checkmark-circle"
          size={20}
          color={'green'}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      ) : null}
      <TouchableOpacity style={{ marginBottom: paddings.XS }} onPress={onPress}>
        <Image source={personalities[img]} style={[imgStyle]} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: fonts.SEMI_BOLD,
          fontSize: fontSizes.MEDIUM_SMALL,
          color: small ? colors.DARK_BLACK : colors.LIGHT_GREY,
        }}
      >
        {personality.toUpperCase()}
      </Text>
    </View>
  );
};

export default Personality;
/*//style for the image
const ImageContainer = styled.Image`
  margin-bottom: 0;
  right: 0;
  left: 0;
  ${'' /!* without the -5, a space is below the image-->need further investigation *!/} bottom: -5;
  align-self: center;
`;

//style for the text of the button
const ButtonText = styled.Text`
  font-family: ${fonts.SEMI_BOLD};
  font-size: ${fontSizes.MEDIUM_SMALL};
  text-align: center;
  color: ${props => {
    return props.titleColor ? props.titleColor : '#91999f';
  }};
  background-color: transparent;
`;

/!**
 * Styled Personality component
 * @param {string} title - Sets the title of the personality
 * @param {function} onPress - Sets the function after clicking on a personality
  *!/
export default class Personality extends React.Component {
  state = {
    imageObject: placeholder,
    imageHeight: 0,
    imageWidth: 0,
  };

  /!**
   * When the component is mounting we switch images based on the set text name
   * in this.props.image
   *!/
  componentDidMount() {
    this.checkPersonality(this.props.image);
  }

  componentWillReceiveProps(nextProps) {
    this.checkPersonality(nextProps.image);
  }

  /!**
   * React native doesn't support letter spacing
   * This function hacks a similair design together
   * @param string
   * @param count
   * @returns {string}
   *!/
  applyLetterSpacing(string, count = 1) {
    return string.split('').join('\u200A'.repeat(count));
  }

  /!**
   * Render the component
   * @returns {XML}
   *!/
  render = () => {
    return (
      <View style={{ display: 'flex', paddingLeft: 7, paddingRight: 7 }}>
        {this.props.edit && this.props.selected ? (
          <Icon
            name="md-checkmark-circle"
            size={20}
            color={'green'}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        ) : null}
        <TouchableOpacity
          style={{ height: this.state.imageHeight + 10 }}
          onPress={this.props.onPress}
        >
          {this.props.amount && (
            <View
              style={{
                height: 25,
                width: 25,
                borderRadius: 100,
                backgroundColor: '#6c6c85',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                right: 0,
                zIndex: 1,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {this.props.amount}
              </Text>
            </View>
          )}
          <ImageContainer
            style={{
              height: this.state.imageHeight,
              width: this.state.imageWidth,
            }}
            source={this.state.imageObject}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <ButtonText>
          {this.props.title.toUpperCase()}
        </ButtonText>
      </View>
    );
  };
}*/
