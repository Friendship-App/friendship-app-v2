import { SubmissionError } from 'redux-form';
import { checkPersonalities } from '../../utils/fieldValidation';

export function validatePersonalities(values) {
  const validation = checkPersonalities(values.personalities);

  if (!validation.isValid) {
    throw new SubmissionError({
      ...validation,
      _error: 'Login failed !',
    });
  }
}
