import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {colors} from "../../styles";

export default class ProgessBar extends React.Component {
  renderProgess = () => {
    const {color} = this.props;
    const backgroundColor = color ? color : colors.DARK_GREY;
    let progress = [];
    for (let i = 0; i < this.props.steps; i++) {
      progress.push(<View style={[styles.horizontalLine, {backgroundColor}]} color={this.props.color} key={i}/>);
    }
    return progress;
  };

  render() {
    return <View style={styles.containerStyle}>{this.renderProgess()}</View>;
  };
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 10,
    justifyContent: 'flex-start',
  },
  horizontalLine: {
    height: 9,
    width: Dimensions.get('window').width / 5 - 4,
    marginLeft: 2,
    marginRight: 2
  }
});
