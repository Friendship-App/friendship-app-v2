import React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from "react-native";
import {YOUR_PROFILE} from "../ProgressSteps";
import RegisterHeader from "../RegisterHeader";
import styles from "./styles";
import Footer from "../Footer";
import {change} from "redux-form";
import {connect} from "react-redux";
import RegisterTextInput from "../RegisterTextInput";
import {colors} from "../../styles";

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
    />
  ))
}

function renderUsernameEmailAndPasswordFields(dispatch) {
  const fields = [
    {
      name: 'username',
      returnKeyType: 'next',
      placeholder: '(NICK)NAME',
      secureTextEntry: false,
      onChangeText: values => dispatch(change('register', 'username', values)),
      navigate: () => this._email.getRenderedComponent().focus(),
      helperText: '(visible)'
    },
    {
      name: 'email',
      keyboardType: 'email-address',
      returnKeyType: 'next',
      placeholder: 'EMAIL*',
      secureTextEntry: false,
      onChangeText: values => dispatch(change('register', 'email', values)),
      navigate: () => this._password.getRenderedComponent().focus(),
      reference: field => (this._email = field),
      helperText: '(private)'
    },
    {
      name: 'password',
      returnKeyType: 'next',
      placeholder: 'PASSWORD*',
      secureTextEntry: true,
      onChangeText: values => dispatch(change('register', 'password', values)),
      navigate: () => this._birthyear.getRenderedComponent().focus(),
      reference: field => (this._password = field)
    },
  ];

  return (
    <View>
      {renderFields(fields)}
    </View>
  )
}


function renderBirthYearAndGenderFields(dispatch) {
  const fields = [
    {
      name: 'birthyear',
      keyboardType: 'numeric',
      returnKeyType: 'done',
      placeholder: 'BIRTH YEAR*',
      secureTextEntry: false,
      onChangeText: values => dispatch(change('register', 'birthyear', values)),
      reference: field => (this._birthyear = field),
      helperText: 'This will be displayed as age range'
    },
  ];
  return (
    <View style={{backgroundColor: colors.WHITE}}>
      {renderFields(fields)}

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
    <ScrollView>
      <RegisterHeader processStage={YOUR_PROFILE} headerTitle={'YOUR PROFILE'} backgroundStyle={'light'}/>
      {renderUsernameEmailAndPasswordFields(props.dispatch)}
      {renderBirthYearAndGenderFields(props.dispatch)}
      {renderPicturePicker(props.dispatch)}
    </ScrollView>
    <Footer color='blue' onPress={props.handleSubmit}>
      <Text style={styles.next}>Next</Text>
    </Footer>
  </KeyboardAvoidingView>
);

export default connect()(UserInformationForm);