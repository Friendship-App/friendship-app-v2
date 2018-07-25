import React from 'react';
import EditAccount from '../../components/EditAccount';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import { refreshMyInformation } from '../../actions/refresh';
import { validateUpdateAccount } from './validation';
import { updateUserAccount } from '../../actions/users';

const mapStateToProps = state => ({
  myDetails: state.users.myDetails.data,
});

const EditAccountScreen = props => {
  const { email } = props.myDetails;

  const initialValues = { email, password: '', passwordConfirmation: '' };

  return (
    <EditAccount
      initialValues={initialValues}
      initialize={props.initialize}
      dispatch={props.dispatch}
      invalid={props.invalid}
      handleSubmit={data => props.handleSubmit(data)}
      hasChanged={props.dirty}
    />
  );
};

EditAccountScreen.propTypes = {};

export default connect(
  mapStateToProps,
  null,
)(
  reduxForm({
    form: 'updateAccount',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: (value, dispatch) => validateUpdateAccount(value, dispatch),
    onSubmitSuccess: (result, dispatch, props) => {
      dispatch(updateUserAccount());
    },
  })(EditAccountScreen),
);
