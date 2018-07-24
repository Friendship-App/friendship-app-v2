import React from 'react';
import EditAccount from '../../components/EditAccount';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { validateUserInformation } from '../RegisterUserInformationScreen/validation';

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
      handleSubmit={data => props.handleSubmit(data)}
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
    onSubmit: (value, dispatch) => console.log(value),
    onSubmitSuccess: (result, dispatch, props) => {
      console.log(result);
    },
  })(EditAccountScreen),
);
