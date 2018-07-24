import { SubmissionError } from 'redux-form';
import moment from 'moment/moment';
import { validateEmail, validateUsername } from '../actions/register';

export async function validateUserInformation(values, dispatch) {
  let err = null;

  if (!values.username) {
    err = {
      ...err,
      username: 'Enter a valid username',
    };
  } else {
    const nbOfUsersWithUsername = await dispatch(
      validateUsername(values.username),
    );
    if (nbOfUsersWithUsername > 0) {
      err = {
        ...err,
        username: `That username is already taken : ${values.username}`,
      };
    }
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
  } else {
    const nbOfUsersWithEmail = await dispatch(validateEmail(values.email));
    if (nbOfUsersWithEmail > 0) {
      err = {
        ...err,
        email: `This email is already used : ${values.email}`,
      };
    }
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

  if (!values.genders || values.genders.length <= 0) {
    err = {
      ...err,
      genders: 'Select at least a gender',
    };
  }

  console.log(err);

  if (err) {
    throw new SubmissionError({
      ...err,
      _error: 'Login failed !',
    });
  }
}
