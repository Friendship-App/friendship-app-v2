import moment from 'moment/moment';
import { validateEmail, validateUsername } from '../actions/register';

export const checkUsername = async (
  username,
  dispatch,
  validation = { isValid: true },
) => {
  if (!username) {
    return {
      ...validation,
      username: 'Enter a valid username',
      isValid: false,
    };
  } else {
    const nbOfUsersWithUsername = await dispatch(validateUsername(username));
    if (nbOfUsersWithUsername > 0) {
      return {
        ...validation,
        username: `That username is already taken : ${username}`,
        isValid: false,
      };
    }
  }

  return validation;
};

export const checkEmail = async (
  email,
  dispatch,
  validation = { isValid: true },
) => {
  function emailNotValid(email) {
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !emailRegEx.test(email);
  }

  if (!email || emailNotValid(email)) {
    return {
      ...validation,
      email: 'Enter a valid email (ex. foo@bar.com)',
      isValid: false,
    };
  } else {
    const nbOfUsersWithEmail = await dispatch(validateEmail(email));
    if (nbOfUsersWithEmail > 0) {
      return {
        ...validation,
        email: `This email is already used : ${email}`,
        isValid: false,
      };
    }
  }

  return validation;
};

export const checkPassword = (password, validation = { isValid: true }) => {
  if (!password) {
    return {
      ...validation,
      password: 'Enter a valid password',
      isValid: false,
    };
  }

  return validation;
};

export const checkPasswordConfirmation = (
  password,
  passwordConfirmation,
  validation = { isValid: true },
) => {
  if (!passwordConfirmation) {
    return {
      ...validation,
      passwordConfirmation: 'Confirm your new password',
      isValid: false,
    };
  }

  if (password !== passwordConfirmation) {
    return {
      ...validation,
      passwordConfirmation: "Passwords don't match",
      isValid: false,
    };
  }

  return validation;
};

export const checkBirthYear = (birthyear, validation = { isValid: true }) => {
  function checkAge(birthDate) {
    return moment().year() - birthDate >= 16;
  }

  if (!birthyear) {
    return {
      ...validation,
      birthyear: 'Enter a valid birth year',
      isValid: false,
    };
  } else if (!checkAge(birthyear)) {
    return {
      ...validation,
      birthyear: 'User should be at least 16',
      isValid: false,
    };
  }

  return validation;
};

export const checkGenders = (genders, validation = { isValid: true }) => {
  if (!genders || genders.length <= 0) {
    return {
      ...validation,
      genders: 'Select at least a gender',
      isValid: false,
    };
  }

  return validation;
};

export const checkLocations = (locations, validation = { isValid: true }) => {
  if (!locations || locations.length <= 0) {
    return {
      ...validation,
      locations: 'Select at least a location',
      isValid: false,
    };
  }

  return validation;
};

export const checkPersonalities = (
  personalities,
  validation = { isValid: true },
) => {
  if (personalities.length <= 0) {
    return {
      ...validation,
      personalities: 'You have to select your personalities',
      isValid: false,
    };
  }

  return validation;
};

export const checkTags = (tags, validation = { isValid: true }) => {
  if (tags.length <= 0) {
    return {
      ...validation,
      tags: 'Select at least a tag.',
      isValid: false,
    };
  }

  return validation;
};

export const checkDescription = (
  description,
  validation = { isValid: true },
) => {
  if (description.length <= 0) {
    return {
      ...validation,
      description: 'Write a description.',
      isValid: false,
    };
  }

  return validation;
};
