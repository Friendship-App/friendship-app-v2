import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles';
import Footer from '../Footer';
import PersonalitiesPicker from '../PersonalitiesPicker/PersonalitiesPicker';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

const mapStateToProps = state => ({
  updatePersonalities: state.form.updatePersonalities,
});

class EditPersonalities extends Component {
  componentWillMount() {
    this.props.initialize(this.props.initialValues);
  }

  render() {
    const { personalities, initialValues } = this.props;

    const keyExtractor = personality => 'personality-' + personality.name;

    const getSelectedPersonality = item => {
      const isSelected = initialValues.personalities.indexOf(item.id);
      return isSelected > -1;
    };

    const renderPersonalities = () => {
      const oppositePersonalitiesArray = [];

      for (let i = 0; i < personalities.length; i += 2) {
        oppositePersonalitiesArray.push(
          <Field
            name={'personalitiesPicker'}
            component={PersonalitiesPicker}
            edit
            selected={getSelectedPersonality(personalities[i])}
            small
            personalities={[personalities[i], personalities[i + 1]]}
            onPress={(prevPersonality, updatedPersonality) => {
              const prevPersonalityPos = this.props.updatePersonalities.values.personalities.indexOf(
                prevPersonality,
              );
              let updatedSelectedPersonalities = [
                ...this.props.updatePersonalities.values.personalities,
              ];
              if (prevPersonalityPos < 0) {
                updatedSelectedPersonalities.push(updatedPersonality);
              } else {
                updatedSelectedPersonalities.splice(
                  prevPersonalityPos,
                  1,
                  updatedPersonality,
                );
              }
              this.props.change('personalities', updatedSelectedPersonalities);
            }}
            key={keyExtractor(personalities[i])}
            isLast={i + 2 === personalities.length}
          />,
        );
      }

      return oppositePersonalitiesArray;
    };

    return (
      <View style={[styles.container]}>
        <ScrollView bounces={false} style={[styles.scrollView]}>
          <Text style={[styles.title]}>EDIT PERSONALITIES</Text>
          {renderPersonalities()}
        </ScrollView>
        <Footer
          color="orange"
          disabled={!this.props.hasChanged}
          onPress={this.props.handleSubmit}
        >
          <Text style={[styles.next]}>Update</Text>
        </Footer>
      </View>
    );
  }
}

EditPersonalities.propTypes = {};

export default connect(
  mapStateToProps,
  null,
)(EditPersonalities);
