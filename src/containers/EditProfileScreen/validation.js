import {
  checkBirthYear,
  checkDescription,
  checkGenders,
  checkLocations,
  checkUsername,
} from '../../utils/fieldValidation';
import { SubmissionError } from 'redux-form';

export async function validateUpdateUserProfile(values, dispatch) {
  let validation = await checkUsername(values.username, dispatch);
  validation = checkDescription(values.description, validation);
  validation = checkLocations(values.locations, validation);
  validation = checkBirthYear(values.birthyear, validation);
  validation = checkGenders(values.genders, validation);

  if (!validation.isValid) {
    throw new SubmissionError({
      ...validation,
      _error: 'Failed updating profile!',
    });
  }
}
