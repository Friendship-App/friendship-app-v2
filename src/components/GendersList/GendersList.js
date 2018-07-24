import React from 'react';
import { View } from 'react-native';
import GenderBox from '../GenderBox';
import { paddings } from '../../styles';

export default class Genders extends React.Component {
  state = {
    selectedGenders: [],
  };

  componentWillMount() {
    const { editProfile, selectedGenders } = this.props;
    if (editProfile) {
      this.setState({ selectedGenders });
    }
  }

  updateGenders(value, input) {
    let newSelectedGenders = this.state.selectedGenders;
    if (this.state.selectedGenders.indexOf(value) < 0) {
      newSelectedGenders.push(value);
    } else {
      newSelectedGenders.slice();
      newSelectedGenders.splice(newSelectedGenders.indexOf(value), 1);
    }
    input.onChange(newSelectedGenders);
    this.setState({ selectedGenders: newSelectedGenders });
  }

  render() {
    const { input } = this.props;
    return (
      <View
        style={{
          width: '100%',
          marginVertical: paddings.MD,
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: paddings.SM }}>
          <GenderBox
            updateGenders={() => this.updateGenders(1, input)}
            gender="WOMAN"
            existingGenders={
              this.props.editProfile ? this.state.selectedGenders : null
            }
          />
          <GenderBox
            updateGenders={() => this.updateGenders(2, input)}
            gender="MAN"
            existingGenders={
              this.props.editProfile ? this.state.selectedGenders : null
            }
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <GenderBox
            updateGenders={() => this.updateGenders(3, input)}
            gender="HUMAN"
            existingGenders={
              this.props.editProfile ? this.state.selectedGenders : null
            }
          />
          <GenderBox
            updateGenders={() => this.updateGenders(4, input)}
            gender="OTHER"
            existingGenders={
              this.props.editProfile ? this.state.selectedGenders : null
            }
          />
        </View>
      </View>
    );
  }
}
