import React from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, submit } from 'redux-form';
import LocationsForm from '../../components/LocationsForm';
import { validateLocations } from './validation';

const mapDispatchToProps = dispatch => ({
  goToUserInformationForm: () =>
    dispatch(NavigationActions.navigate({ routeName: 'UserInformation' })),
});

const LocationsScreen = props => {
  return <LocationsForm handleSubmit={data => props.handleSubmit(data)} />;
};

const initialValues = {
  locations: [],
  username: '',
  email: '',
  password: '',
  birthyear: '',
  genders: [],
  personalities: [],
  description: '',
  lovedTags: [],
  hatedTags: [],
};

export default connect(
  null,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'register',
    initialValues,
    onSubmit: validateLocations,
    onSubmitSuccess: (result, dispatch, props) => {
      props.goToUserInformationForm();
    },
  })(LocationsScreen),
);
