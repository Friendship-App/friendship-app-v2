import React from 'react';
import {KeyboardAvoidingView, Text, View} from "react-native";
import {YOUR_PROFILE} from "../ProgressSteps";
import RegisterHeader from "../RegisterHeader";
import styles from "./styles";
import Footer from "../Footer";
import {change} from "redux-form";
import {connect} from "react-redux";
import RegisterTextInput from "../RegisterTextInput";

function renderFields(fields) {
  return fields.map(field => (
    <RegisterTextInput
      name={field.name}
      returnKeyType={field.returnKeyType}
      placeholder={field.placeholder}
      secureTextEntry={field.secureTextEntry}
      onChangeText={field.onChangeText}
      reference={field.reference}
      navigate={field.navigate}
      key={field.name}
    />
  ))
}

function renderUsernameEmailAndPasswordFields(dispatch) {
  const fields = [
    {
      name: 'username',
      keyboardKeyType: '',
      returnKeyType: 'next',
      placeholder: '(NICK)NAME',
      secureTextEntry: false,
      onChangeText: values => dispatch(change('register', 'username', values)),
      navigate: () => this._email.getRenderedComponent().focus(),
    },
    {
      name: 'email',
      keyboardKeyType: 'email-address',
      returnKeyType: 'next',
      placeholder: 'EMAIL*',
      secureTextEntry: false,
      onChangeText: values => dispatch(change('register', 'email', values)),
      navigate: () => this._password.getRenderedComponent().focus(),
      reference: field => (this._email = field)
    },
    {
      name: 'password',
      keyboardKeyType: '',
      returnKeyType: 'next',
      placeholder: 'PASSWORD*',
      secureTextEntry: true,
      onChangeText: values => dispatch(change('register', 'password', values)),
      navigate: () => this._birthYear.getRenderedComponent().focus(),
      reference: field => (this._password = field)
    },
  ];

  return (
    <View>
      {renderFields(fields)}
    </View>
  )
}


function renderBirthYearAndGenderFields(input) {
  return (
    <View>

    </View>
  )
}

function renderPicturePicker(input) {
  return (
    <View>

    </View>
  )
}

const UserInformationForm = props => (
  <KeyboardAvoidingView style={[styles.userInformationForm]} behavior="padding" enabled>
    <RegisterHeader processStage={YOUR_PROFILE} headerTitle={'YOUR PROFILE'} backgroundStyle={'light'}/>
    {renderUsernameEmailAndPasswordFields(props.dispatch)}
    {renderBirthYearAndGenderFields(props.dispatch)}
    {renderPicturePicker(props.dispatch)}
    <Footer color='blue' onPress={props.handleSubmit}>
      <Text style={styles.next}>Next</Text>
    </Footer>
  </KeyboardAvoidingView>
);

export default connect()(UserInformationForm);