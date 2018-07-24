import {
  checkBirthYear,
  checkDescription,
  checkGenders,
  checkLocations,
  checkUsername,
} from '../../utils/fieldValidation';
import { SubmissionError } from 'redux-form';

export async function validateUpdateUserProfile(values, dispatch) {
  let validation = { isValid: true };
  const {
    oldValues,
    username,
    description,
    locations,
    birthyear,
    genders,
  } = values;
  const usernameHasChanged = oldValues.username !== username;

  if (usernameHasChanged) {
    validation = await checkUsername(username, dispatch, validation);
  }
  validation = checkDescription(description, validation);
  validation = checkLocations(locations, validation);
  validation = checkBirthYear(birthyear, validation);
  validation = checkGenders(genders, validation);

  if (!validation.isValid) {
    throw new SubmissionError({
      ...validation,
      _error: 'Failed updating profile!',
    });
  }
}
