import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { colors, fontSizes, paddings } from '../../styles';
import Personality from '../Personality';
import styles from './styles';

class PersonalitiesPicker extends React.Component {
  componentWillMount() {
    if (this.props.edit) {
      this.setState({ selected: this.props.selected });
    } else {
      this.setState({ selected: null });
    }
  }

  render() {
    const handlePress = personalityId => {
      this.props.onPress(personalityId);
      if (this.props.edit) {
        this.setState(prevState => ({ selected: !prevState.selected }));
      }
    };

    return (
      <View
        style={[
          this.props.edit ? styles.containerLine : styles.container,
          { paddingBottom: this.props.isLast ? paddings.FOOTER : 0 },
        ]}
      >
        <Personality
          personality={this.props.personalities[0].name}
          onPress={() => {
            this.props.edit
              ? !this.state.selected
                ? handlePress(this.props.personalities[0].id)
                : null
              : handlePress(this.props.personalities[0].id);
          }}
          selected={this.state.selected}
          edit={this.props.edit}
          small={this.props.small}
        />
        <Text style={this.props.edit ? styles.edit : styles.register}>or</Text>
        <Personality
          personality={this.props.personalities[1].name}
          onPress={() => {
            this.props.edit
              ? this.state.selected
                ? handlePress(this.props.personalities[1].id)
                : null
              : handlePress(this.props.personalities[1].id);
          }}
          selected={!this.state.selected}
          edit={this.props.edit}
          small={this.props.small}
        />
      </View>
    );
  }
}

export default PersonalitiesPicker;
