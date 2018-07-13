import React from 'react';
import {TextInput, View} from "react-native";
import styles from "./styles";

class BubbleTextInput extends React.Component {
  render () {
    return (
      <TextInput
        style={[styles.bubbleTextInput]}
        underlineColorAndroid={'transparent'}
        placeholder={this.props.placeholder}
        multiline={true}
        autoGrow={true}
        textAlignVertical='top'
        onContentSizeChange={evt => this.props.onContentSizeChange(evt)}
      />
    );
  }
}

export default BubbleTextInput;