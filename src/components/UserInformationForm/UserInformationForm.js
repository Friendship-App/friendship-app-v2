import React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View, Dimensions} from "react-native";
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
import AvatarList from "../AvatarList";

const mapStateToProps = state => ({
  register: state.form.register,
});

function renderFields(fields, refs) {
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

function renderUsernameEmailAndPasswordFields(props, refs) {
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
      {renderFields(fields, refs)}
    </View>
  )
}


function renderBirthYearAndGenderFields(props, refs) {
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
    <View style={{backgroundColor: colors.DUST_WHITE}}>
      {renderFields(fields, refs)}
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

function renderAvatarPicker() {
  return(
    <View style={{paddingLeft: paddings.LG, paddingVertical: paddings.MD, backgroundColor: colors.DUST_WHITE}}>
      <Text style={{fontFamily: fonts.SEMI_BOLD, fontSize: 18}}>PICK YOUR AVATAR</Text>
      <Field name="avatar" component={AvatarList} />
    </View>
  )
}

class UserInformationForm extends React.Component {
  render () {
    return (
      <KeyboardAvoidingView style={[styles.userInformationForm]} behavior="padding" enabled>
        <ScrollView bounces={false} ref="scrollView">
          <RegisterHeader processStage={YOUR_PROFILE} headerTitle={'YOUR PROFILE'}/>
          {renderAvatarPicker()}
          {renderUsernameEmailAndPasswordFields(this.props, this.refs)}
          {renderBirthYearAndGenderFields(this.props, this.refs)}
          {renderPicturePicker()}
        </ScrollView>
        <Footer color='blue' onPress={this.props.handleSubmit}>
          <Text style={styles.next}>Next</Text>
        </Footer>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(mapStateToProps, null)(UserInformationForm);