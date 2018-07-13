import React from 'react';
import styles from "./styles";
import {colors, paddings} from "../../styles";
import {Animated, Image, Text, TouchableOpacity, View} from "react-native";
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

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const {tag, isLastTag} = this.props;
    const {selected} = this.state;
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
        style={[styles.tag, {marginBottom: isLastTag ? paddings.FOOTER : paddings.MD, backgroundColor}]}
        onPress={(evt) => this.handlePress(evt)}>
        {shouldShowIcon ? (
          <TouchableOpacity style={[styles.tagPart, styles.yeahIcon]}
                            onPress={() => this.handlePress(Actions.YEAHS_TAG)}>
            <Image source={YeahButtonAsset} style={[styles.icon]}/>
          </TouchableOpacity>
        ) : null}
        <View
          onStartShouldSetResponder={evt => true}
          onResponderRelease={() => this.handlePress(Actions.RESET_TAG_CHOICE)}
          style={[styles.tagPart, {justifyContent: textAlignement}]}
        >
          <Text style={styles.tagText}>{tag.name}</Text>
        </View>
        {shouldShowIcon ? (
          <TouchableOpacity style={[styles.tagPart, styles.nahIcon]} onPress={() => this.handlePress(Actions.NAH_TAG)}>
            <Image source={NahButtonAsset} style={[styles.icon]}/>
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }

  handlePress(evt) {
    let newSelectedState = 0;
    switch (evt) {
      case Actions.YEAHS_TAG:
        newSelectedState = 1;
        break;
      case Actions.NAH_TAG:
        newSelectedState = -1;
        break;
    }
    this.setState({selected: newSelectedState});
  }
}

export default Tag;