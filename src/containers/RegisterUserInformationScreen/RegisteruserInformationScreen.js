import React from 'react';
import {reduxForm, SubmissionError, submit} from "redux-form";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";
import UserInformationForm from "../../components/UserInformationForm";

const mapDispatchToProps = dispatch => ({
  goToPersonalitiesScreen: () => dispatch(NavigationActions.navigate({routeName: 'UserInformation'}))
});

const UserInformationScreen = props => (
  <UserInformationForm handleSubmit={() => props.dispatch(submit('register'))}/>
);

export async function validateUserInformation(values) {
  let err = null;

  if (!values.username) {
    err = {
      ...err,
      username: 'Enter a valid username',
    };
  } else if (!await isUsernameAvailable(values.username)) {
    err = {
      ...err,
      username: `That username is already taken : ${values.username}`,
    };
  }

  function emailNotValid(email) {
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !emailRegEx.test(email);
  }

  if (!values.email || emailNotValid(values.email)) {
    err = {
      ...err,
      email: 'Enter a valid email (ex. foo@bar.com)',
    };
  } else if (!await isEmailAvailable(values.email)) {
    err = {
      ...err,
      email: `This email is already used : ${values.email}`,
    };
  }

  if (!values.password) {
    err = {
      ...err,
      password: 'Enter a valid password',
    };
  }

  function checkAge(birthDate) {
    return moment().year() - birthDate >= 16;
  }

  if (!values.birthyear) {
    err = {
      ...err,
      birthyear: 'Enter a valid birth year',
    };
  } else if (!checkAge(values.birthyear)) {
    err = {
      ...err,
      birthyear: 'User should be at least 16',
    };
  }

  if (!values.gender) {
    err = {
      ...err,
      gender: 'Select at least a gender',
    };
  }

  if (err) {
    throw new SubmissionError({
      ...err,
      _error: 'Login failed !',
    });
  }
}

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'register',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: validateUserInformation,
    onSubmitSuccess: (result, dispatch, props) => {
      props.goToPersonalitiesScreen();
    }
  })(UserInformationScreen)
);