import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {fonts} from "../../styles";

export default class GenderBox extends React.Component {
  state = {color: '#ffffff'};

  componentWillMount() {
    if (this.props.existingGenders) {
      let genderToMatch;
      switch (this.props.gender) {
        case 'WOMAN':
          genderToMatch = 1;
          break;
        case 'MAN':
          genderToMatch = 2;
          break;
        case 'HUMAN':
          genderToMatch = 3;
          break;
        case 'OTHER':
          genderToMatch = 4;
          break;
      }
      const pos = this.props.existingGenders.indexOf(genderToMatch);
      if (pos > -1) {
        this.setState({color: '#ff8a65'});
      }
    }
  }

  _handlePress() {
    this.props.updateGenders();
    if (this.state.color === '#ffffff') {
      return this.setState({color: '#ff8a65'});
    }
    return this.setState({color: '#ffffff'});
  }

  render() {
    return (
      <View style={{
        backgroundColor: this.state.color,
        overflow: 'hidden',
        height: 44,
        width: '36%',
        borderRadius: 27,
        paddingLeft: 15,
        marginRight: 11,
        justifyContent: 'center'
      }}>
        <TouchableOpacity onPress={() => this._handlePress()}>
          <Text style={{fontFamily: fonts.SEMI_BOLD, fontSize: 18, color: '#4a4a4a'}}>{this.props.gender}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}