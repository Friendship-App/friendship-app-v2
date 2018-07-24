import { SubmissionError } from 'redux-form';
import {
  checkBirthYear,
  checkEmail,
  checkGenders,
  checkPassword,
  checkUsername,
} from '../../utils/fieldValidation';

export const validateUserInformation = async (values, dispatch) => {
  let validation = await checkUsername(values.username, dispatch);
  validation = await checkEmail(values.email, dispatch, validation);
  validation = checkPassword(values.password, validation);
  validation = checkBirthYear(values.birthyear, validation);
  validation = checkGenders(values.genders, validation);

  if (!validation.isValid) {
    throw new SubmissionError({
      ...validation,
      _error: 'Login failed !',
    });
  }
};
