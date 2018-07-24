import React from 'react';
import EditAccount from '../../components/EditAccount';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { validateUserInformation } from '../../utils/reduxValidations';

const mapStateToProps = state => ({
  myDetails: state.users.myDetails.data,
});

const EditAccountScreen = props => {
  const { email } = props.myDetails;

  const initialValues = { email };

  return (
    <EditAccount
      initialValues={initialValues}
      initialize={props.initialize}
      dispatch={props.dispatch}
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
    onSubmit: (value, dispatch) => validateUserInformation(value, dispatch),
    onSubmitSuccess: (result, dispatch, props) => {
      console.log(result);
    },
  })(EditAccountScreen),
);
