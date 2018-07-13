import React from 'react';
import {NavigationActions} from 'react-navigation';
import {connect} from "react-redux";
import {reduxForm, SubmissionError, submit} from "redux-form";
import LocationsForm from "../../components/LocationsForm";

const mapDispatchToProps = dispatch => ({
  goToUserInformationForm: () => dispatch(NavigationActions.navigate({routeName: 'UserInformation'}))
});

const LocationsScreen = props => (
  <LocationsForm handleSubmit={(data) => props.handleSubmit(data)}/>
);

function validateLocations(values) {
  if (!values.locations || values.locations.length <= 0) {
    throw new SubmissionError({
      locations: 'Select at least a location',
      _error: 'Login failed !',
    });
  }
}

const initialValues = {
  locations: [],
  username: '',
  email: '',
  password: '',
  birthyear: '',
  genders: [],
  enableMatching: false,
  description: '',
  lovedActivities: [],
  hatedActivities: [],
  lovedInterests: [],
  hatedInterests: [],
};

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'register',
    initialValues,
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    onSubmit: validateLocations,
    onSubmitSuccess: (result, dispatch, props) => {
      props.goToUserInformationForm();
    }
  })(LocationsScreen)
);