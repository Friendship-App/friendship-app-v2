import React from 'react';
import styles from './styles';
import { colors, paddings } from '../../styles';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import YeahButtonAsset from '../../../assets/img/loveAndHate/yeah_200.png';
import NahButtonAsset from '../../../assets/img/loveAndHate/naah_200.png';

const Actions = {
  YEAHS_TAG: 'YEAHS_TAG',
  NAH_TAG: 'NAH_TAG',
  RESET_TAG_CHOICE: 'RESET_TAG_CHOICE',
};

const initialState = {
  selected: 0,
};

class TagPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    if (this.props.editProfile) {
      if (this.props.selectionState) {
        this.setState({ selected: this.props.selectionState });
      }
    }
  }

  render() {
    const { tag, isLastTag } = this.props;
    const { selected } = this.state;

    let backgroundColor = colors.DARK_BLACK;
    let textAlignement = 'center';
    const shouldShowIcon = selected === 0;
    switch (selected) {
      case -1:
        backgroundColor = colors.ORANGE;
        textAlignement = 'flex-end';
        break;
      case 1:
        backgroundColor = colors.BLUE;
        textAlignement = 'flex-start';
        break;
    }
    return (
      <View
        style={[
          styles.tag,
          {
            marginBottom: isLastTag ? paddings.FOOTER : paddings.MD,
            backgroundColor,
          },
        ]}
        onPress={evt => this.handlePress(evt)}
      >
        {shouldShowIcon ? (
          <TouchableOpacity
            style={[styles.tagPart, styles.yeahIcon]}
            onPress={() => this.handlePress(Actions.YEAHS_TAG)}
          >
            <Image
              source={YeahButtonAsset}
              style={[styles.icon]}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : null}
        <View
          onStartShouldSetResponder={evt => true}
          onResponderRelease={() => this.handlePress(Actions.RESET_TAG_CHOICE)}
          style={[
            styles.tagPart,
            { justifyContent: textAlignement, backgroundColor },
          ]}
        >
          <Text style={styles.tagText}>{tag.name}</Text>
        </View>
        {shouldShowIcon ? (
          <TouchableOpacity
            style={[styles.tagPart, styles.nahIcon]}
            onPress={() => this.handlePress(Actions.NAH_TAG)}
          >
            <Image
              source={NahButtonAsset}
              style={[styles.icon]}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  handlePress(evt) {
    const { selected } = this.state;
    const { onPress, tag } = this.props;
    if (evt === Actions.RESET_TAG_CHOICE && selected !== 0) {
      this.setState({ selected: 0 });
      onPress(tag.id, Actions.RESET_TAG_CHOICE);
    } else if (evt === Actions.YEAHS_TAG && selected === 0) {
      this.setState({ selected: 1 });
      onPress(tag.id, Actions.YEAHS_TAG);
    } else if (evt === Actions.NAH_TAG && selected === 0) {
      this.setState({ selected: -1 });
      onPress(tag.id, Actions.NAH_TAG);
    }
  }
}

export default TagPicker;
export { Actions };
