import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import UserInformationForm from '../../components/UserInformationForm';
import { validateUserInformation } from '../../utils/reduxValidations';

const mapDispatchToProps = dispatch => ({
  goToPersonalitiesScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Personalities' })),
});

const UserInformationScreen = props => (
  <UserInformationForm
    handleSubmit={data => props.handleSubmit(data)}
    {...props}
  />
);

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'register',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: (value, dispatch) => validateUserInformation(value, dispatch),
    onSubmitSuccess: (result, dispatch, props) => {
      props.goToPersonalitiesScreen();
    },
  })(UserInformationScreen),
);
