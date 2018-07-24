import {
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
} from '../../utils/fieldValidation';
import { SubmissionError } from 'redux-form';

export const validateUpdateAccount = async (values, dispatch) => {
  const { oldValues } = values;
  let validation = { isValid: true };
  const emailHasChanged = oldValues.email !== values.email;
  const passwordHasChanged =
    values.password.length > 0 && values.passwordConfirmation.length > 0;
  if (emailHasChanged) {
    validation = await checkEmail(values.email, dispatch);
  }
  if (passwordHasChanged) {
    validation = checkPassword(values.password, validation);
    validation = checkPasswordConfirmation(
      values.password,
      values.passwordConfirmation,
      validation,
    );
  }

  if (!validation.isValid) {
    throw new SubmissionError({
      ...validation,
      _error: 'Update account failed',
    });
  }
};
