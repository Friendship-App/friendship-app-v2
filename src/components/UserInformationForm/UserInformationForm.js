import React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from "react-native";
import {YOUR_PROFILE} from "../ProgressSteps";
import RegisterHeader from "../RegisterHeader";
import styles from "./styles";
import Footer from "../Footer";
import {change, Field} from "redux-form";
import {connect} from "react-redux";
import RegisterTextInput from "../RegisterTextInput";
import {colors, fonts, paddings} from "../../styles";
import GendersList from "../GendersList";
import PicturePicker from "../PicturePicker";

const mapStateToProps = state => ({
  register: state.form.register,
});

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
    />
  ))
}

function renderUsernameEmailAndPasswordFields(props) {
  const fields = [
    {
      name: 'username',
      returnKeyType: 'next',
      placeholder: '(NICK)NAME',
      secureTextEntry: false,
      onChangeText: values => props.dispatch(change('register', 'username', values)),
      navigate: () => this._email.getRenderedComponent().focus(),
      helperText: '(visible)',
      err: props.register.submitFailed && props.register.submitErrors ? props.register.submitErrors.username : null
    },
    {
      name: 'email',
      keyboardType: 'email-address',
      returnKeyType: 'next',
      placeholder: 'EMAIL*',
      secureTextEntry: false,
      onChangeText: values => props.dispatch(change('register', 'email', values)),
      navigate: () => this._password.getRenderedComponent().focus(),
      reference: field => (this._email = field),
      helperText: '(private)',
      err: props.register.submitFailed && props.register.submitErrors ? props.register.submitErrors.email : null
    },
    {
      name: 'password',
      returnKeyType: 'next',
      placeholder: 'PASSWORD*',
      secureTextEntry: true,
      onChangeText: values => props.dispatch(change('register', 'password', values)),
      navigate: () => this._birthyear.getRenderedComponent().focus(),
      reference: field => (this._password = field),
      err: props.register.submitFailed && props.register.submitErrors ? props.register.submitErrors.password : null
    },
  ];

  return (
    <View>
      {renderFields(fields)}
    </View>
  )
}


function renderBirthYearAndGenderFields(props) {
  const fields = [
    {
      name: 'birthyear',
      keyboardType: 'numeric',
      returnKeyType: 'done',
      placeholder: 'BIRTH YEAR*',
      secureTextEntry: false,
      onChangeText: values => props.dispatch(change('register', 'birthyear', values)),
      reference: field => (this._birthyear = field),
      helperText: 'This will be displayed as age range',
      err: props.register.submitFailed && props.register.submitErrors ? props.register.submitErrors.birthyear : null
    },
  ];
  return (
    <View style={{backgroundColor: colors.WHITE}}>
      {renderFields(fields)}
      <View style={{marginHorizontal: paddings.LG, marginVertical: paddings.MD,}}>
        <Text style={{fontFamily: fonts.SEMI_BOLD, fontSize: 18}}>GENDER*</Text>
        <Text style={{fontFamily: fonts.LIGHT}}>(visible)</Text>
        <Field name={'genders'} component={GendersList}/>
        {props.register.submitFailed && props.register.submitErrors ? (
          <Text style={[styles.warning]}>{props.register.submitErrors.genders}</Text>) : null}
      </View>
    </View>
  )
}

function renderPicturePicker() {
  return (
    <View style={{marginHorizontal: paddings.LG, marginVertical: paddings.MD, paddingBottom: 100}}>
      <Text style={{fontFamily: fonts.SEMI_BOLD, fontSize: 18}}>ADD PHOTO</Text>
      <Text style={{fontFamily: fonts.LIGHT}}>This can be a photo of anything you like</Text>
      <Field name="image" component={PicturePicker}/>
    </View>
  )
}

const UserInformationForm = props => (
  <KeyboardAvoidingView style={[styles.userInformationForm]} behavior="padding" enabled>
    <ScrollView>
      <RegisterHeader processStage={YOUR_PROFILE} headerTitle={'YOUR PROFILE'} backgroundStyle={'light'}/>
      {renderUsernameEmailAndPasswordFields(props)}
      {renderBirthYearAndGenderFields(props)}
      {renderPicturePicker()}
    </ScrollView>
    <Footer color='blue' onPress={props.handleSubmit}>
      <Text style={styles.next}>Next</Text>
    </Footer>
  </KeyboardAvoidingView>
);

export default connect(mapStateToProps, null)(UserInformationForm);