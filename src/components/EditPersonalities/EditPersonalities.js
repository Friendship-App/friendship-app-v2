import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles';
import Personality from '../Personality/Personality';
import Footer from '../Footer';
import { paddings } from '../../styles';
import PersonalitiesPicker from '../PersonalitiesPicker/PersonalitiesPicker';

class EditPersonalities extends Component {
  render() {
    const { personalities, userPersonalities } = this.props;
    const oppositePersonalitiesArray = [];

    const keyExtractor = personality => 'personality-' + personality.name;

    const getSelectedPersonality = item => {
      const isSelected = userPersonalities.find(
        userPersonality => userPersonality.id === item.id,
      );
      return !!isSelected;
    };

    for (let i = 0; i < personalities.length; i += 2) {
      oppositePersonalitiesArray.push(
        <PersonalitiesPicker
          edit
          selected={getSelectedPersonality(personalities[i])}
          small
          personalities={[personalities[i], personalities[i + 1]]}
          onPress={personalityId => console.log(personalityId)}
          key={keyExtractor(personalities[i])}
          isLast={i + 2 === personalities.length}
        />,
      );
    }

    return (
      <View style={[styles.container]}>
        <ScrollView bounces={false} style={[styles.scrollView]}>
          <Text style={[styles.title]}>EDIT PERSONALITIES</Text>
          {oppositePersonalitiesArray}
        </ScrollView>
        <Footer
          color="orange"
          // disabled={!this.props.hasChanged}
          onPress={() => console.log('pressed')}
        >
          <Text style={[styles.next]}>Update</Text>
        </Footer>
      </View>
    );
  }
}

EditPersonalities.propTypes = {};

export default EditPersonalities;
