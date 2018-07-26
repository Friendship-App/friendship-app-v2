import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import styles from './styles';
import { colors, fonts, paddings } from '../../styles';
import PicturePicker from '../PicturePicker';
import { change, Field } from 'redux-form';
import GendersList from '../GendersList';
import RegisterTextInput from '../RegisterTextInput';
import MoodList from '../MoodList';
import Footer from '../Footer/Footer';
import LocationsList from '../LocationsList';
import { connect } from 'react-redux';

function renderFields(fields) {
  return fields.map(field => (
    <RegisterTextInput
      name={field.name}
      keyboardType={field.keyboardType}
      returnKeyType={field.returnKeyType}
      placeholder={field.placeholder}
      secureTextEntry={field.secureTextEntry}
      onChangeText={field.onChangeText}
      reference={field.reference}
      navigate={field.navigate}
      key={field.name}
      helperText={field.helperText}
      err={field.err}
      value={field.value}
      multiline={field.multiline}
    />
  ));
}

function renderMoodPicker(mood) {
  return (
    <View
      style={{
        paddingVertical: paddings.MD,
        backgroundColor: colors.DUST_WHITE,
      }}
    >
      <Text
        style={{
          paddingLeft: paddings.LG,
          fontFamily: fonts.SEMI_BOLD,
          fontSize: 18,
        }}
      >
        PICK YOUR MOOD
      </Text>
      <Field name="mood" component={MoodList} editProfile selectedMood={mood} />
    </View>
  );
}

function renderUsernameDescriptionAndLocationFields(props) {
  const { invalid, dispatch } = props;
  let username, description;
  if (invalid) {
    username = props.updateProfile.submitErrors.username;
    description = props.updateProfile.submitErrors.description;
  }

  const fields = [
    {
      name: 'username',
      returnKeyType: 'next',
      placeholder: '(NICK)NAME',
      secureTextEntry: false,
      onChangeText: values =>
        dispatch(change('updateProfile', 'username', values)),
      navigate: () => this._description.getRenderedComponent().focus(),
      helperText: '(visible)',
      err: username,
      value: props.initialValues.username,
    },
    {
      name: 'description',
      placeholder: 'Tell us some about you',
      secureTextEntry: false,
      onChangeText: values =>
        props.dispatch(change('updateProfile', 'description', values)),
      reference: field => (this._description = field),
      helperText: '(private)',
      err: description,
      value: props.initialValues.description,
      multiline: true,
    },
  ];

  return (
    <View>
      {renderFields(fields)}
      <Field
        name={'locations'}
        component={LocationsList}
        editProfile
        selectedLocations={props.initialValues.locations}
      />
    </View>
  );
}

function renderBirthYearAndGenderFields(props) {
  const { invalid } = props;
  let birthyear, genders;
  if (invalid) {
    birthyear = props.updateProfile.submitErrors.birthyear;
    genders = props.updateProfile.submitErrors.genders;
  }
  const fields = [
    {
      name: 'birthyear',
      keyboardType: 'numeric',
      returnKeyType: 'done',
      placeholder: 'BIRTH YEAR*',
      secureTextEntry: false,
      onChangeText: values =>
        props.dispatch(change('updateProfile', 'birthyear', values)),
      reference: field => (this._birthyear = field),
      helperText: 'This will be displayed as age range',
      err: birthyear,
      value: props.initialValues.birthyear.toString(),
    },
  ];

  return (
    <View style={{ backgroundColor: colors.DUST_WHITE }}>
      {renderFields(fields)}
      <View
        style={{ marginHorizontal: paddings.LG, marginVertical: paddings.MD }}
      >
        <Text style={{ fontFamily: fonts.SEMI_BOLD, fontSize: 18 }}>
          GENDER*
        </Text>
        <Text style={{ fontFamily: fonts.LIGHT }}>(visible)</Text>
        <Field
          name={'genders'}
          component={GendersList}
          selectedGenders={[1, 2]}
          editProfile
        />
        {invalid ? <Text style={[styles.warning]}>{genders}</Text> : null}
      </View>
    </View>
  );
}

function renderPicturePicker(image) {
  return (
    <View
      style={{
        marginHorizontal: paddings.LG,
        marginVertical: paddings.MD,
        paddingBottom: 100,
      }}
    >
      <Text style={{ fontFamily: fonts.SEMI_BOLD, fontSize: 18 }}>
        ADD PHOTO
      </Text>
      <Text style={{ fontFamily: fonts.LIGHT }}>
        This can be a photo of anything you like
      </Text>
      <Field name="image" component={PicturePicker} editProfile image={image} />
    </View>
  );
}

const mapStateToProps = state => ({
  updateProfile: state.form.updateProfile,
});

class EditProfile extends Component {
  componentWillMount() {
    this.props.initialize({
      ...this.props.initialValues,
      oldValues: this.props.initialValues,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={[styles.container]}>
        <ScrollView bounces={false} ref="scrollView">
          <Text style={[styles.title]}>EDIT PROFILE</Text>
          {renderMoodPicker(this.props.initialValues.mood)}
          {renderUsernameDescriptionAndLocationFields(this.props)}
          {renderBirthYearAndGenderFields(this.props)}
          {renderPicturePicker(this.props.initialValues.image)}
        </ScrollView>
        <Footer
          disabled={!this.props.hasChanged}
          color="blue"
          onPress={this.props.handleSubmit}
        >
          <Text style={styles.next}>Update</Text>
        </Footer>
      </KeyboardAvoidingView>
    );
  }
}

EditProfile.propTypes = {};

export default connect(
  mapStateToProps,
  null,
)(EditProfile);
