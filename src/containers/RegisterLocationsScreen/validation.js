import { SubmissionError } from 'redux-form';
import { checkLocations } from '../../utils/fieldValidation';

export function validateLocations(values) {
  const validation = checkLocations(values.locations);

  if (!validation.isValid) {
    throw new SubmissionError({
      ...validation,
      _error: 'Login failed !',
    });
  }
}
