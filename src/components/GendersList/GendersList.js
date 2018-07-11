import React from 'react';
import {View} from 'react-native';
import GenderBox from '../GenderBox';
import {paddings} from "../../styles";

export default class Genders extends React.Component {
  state = {
    selectedGenders: [],
  };

  updateGenders(value, input) {
    let newSelectedGenders = this.state.selectedGenders;
    if (this.state.selectedGenders.indexOf(value) < 0) {
      newSelectedGenders.push(value);
    } else {
      newSelectedGenders.slice();
      newSelectedGenders.splice(newSelectedGenders.indexOf(value), 1);
    }
    input.onChange(newSelectedGenders);
    this.setState({selectedGenders: newSelectedGenders});
  }

  render() {
    const {input} = this.props;
    return (
      <View
        style={{
          width: '100%',
          marginVertical: paddings.MD,
        }}
      >
        <View style={{flexDirection: 'row', marginBottom: paddings.SM}}>
          <GenderBox
            updateGenders={() => this.updateGenders(1, input)}
            gender="WOMAN"
          />
          <GenderBox
            updateGenders={() => this.updateGenders(2, input)}
            gender="MAN"
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <GenderBox
            updateGenders={() => this.updateGenders(3, input)}
            gender="HUMAN"
          />
          <GenderBox
            updateGenders={() => this.updateGenders(4, input)}
            gender="OTHER"
          />
        </View>

        {/*<GenderBoxContainer style={{ height: 44 }}>
          <GenderBox
            updateGenders={() => this.updateGenders(1, input)}
            gender="WOMAN"
          />
          <GenderBox
            updateGenders={() => this.updateGenders(2, input)}
            gender="MAN"
          />
        </GenderBoxContainer>
        <GenderBoxContainer style={{ height: 44, marginLeft: '38%' }}>
          <GenderBox
            updateGenders={() => this.updateGenders(3, input)}
            gender="HUMAN"
          />
          <GenderBox
            updateGenders={() => this.updateGenders(4, input)}
            gender="OTHER"
          />
        </GenderBoxContainer>*/}
      </View>
    );
  }
}

/*
const GenderBoxContainer = styled.View`
  height: 44;
  width: 100%;
  margin-left: 26%;
  flex-direction: row;
  margin-top: 12;
`;
*/
