import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import EditProfile from '../../components/EditProfile';
import { validateUpdateUserProfile } from './validation';
import { refreshMyInformation } from '../../actions/refresh';
import { updateUserProfile } from '../../actions/users';

const mapStateToProps = state => ({
  myDetails: state.users.myDetails.data,
  locationsList: state.locations.locationsList,
});

const EditProfileScreen = props => {
  const {
    username,
    description,
    birthyear,
    locations,
    genders,
    image,
    mood,
  } = props.myDetails;
  const genderToGenderIdArray = [];
  const locationToLocationIdArray = [];

  genders.map(gender => {
    switch (gender.toLowerCase()) {
      case 'woman':
        return genderToGenderIdArray.push(1);
      case 'man':
        return genderToGenderIdArray.push(2);
      case 'human':
        return genderToGenderIdArray.push(3);
      case 'other':
        return genderToGenderIdArray.push(4);
    }
  });

  let foundLocation;
  if (props.locationsList.length > 0) {
    locations.map(location => {
      foundLocation = props.locationsList.find(
        locationFromList =>
          locationFromList.name.toLowerCase() === location.toLowerCase(),
      );
      locationToLocationIdArray.push(foundLocation.id);
    });
  }

  const initialValues = {
    mood,
    username,
    description,
    birthyear,
    locations: locationToLocationIdArray,
    genders: genderToGenderIdArray,
    image,
  };

  return (
    <EditProfile
      initialValues={initialValues}
      initialize={props.initialize}
      dispatch={props.dispatch}
      invalid={props.invalid}
      handleSubmit={data => props.handleSubmit(data)}
      hasChanged={props.dirty}
    />
  );
};

export default connect(
  mapStateToProps,
  null,
)(
  reduxForm({
    form: 'updateProfile',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: (value, dispatch) => validateUpdateUserProfile(value, dispatch),
    onSubmitSuccess: (result, dispatch, props) => {
      dispatch(updateUserProfile());
    },
  })(EditProfileScreen),
);
