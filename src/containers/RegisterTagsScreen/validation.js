import { SubmissionError } from 'redux-form';
import { checkTags } from '../../utils/fieldValidation';

export function validateTags(values) {
  const selectedTags = [].concat(values.lovedTags, values.hatedTags);
  const validation = checkTags(selectedTags);

  if (!validation.isValid) {
    throw new SubmissionError({
      ...validation,
      _error: 'Login failed !',
    });
  }
}
