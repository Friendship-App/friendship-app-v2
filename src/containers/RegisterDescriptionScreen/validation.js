import { SubmissionError } from 'redux-form';
import { checkDescription } from '../../utils/fieldValidation';

export function validateDescription(values) {
  const { description } = values;
  const validation = checkDescription(description);

  if (!validation.isValid) {
    throw new SubmissionError({
      ...validation,
      _error: 'Login failed !',
    });
  }
}
