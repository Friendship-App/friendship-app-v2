import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { validateUserInformation } from '../../utils/reduxValidations';

const mapStateToProps = state => ({
  myDetails: state.users.myDetails.data,
});

const EditProfileScreen = props => {
  const {
    username,
    email,
    birthyear,
    genders,
    image,
    avatar,
  } = props.myDetails;
  const genderToGenderIdArray = [];

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

  const initialValues = {
    avatar,
    username,
    email,
    birthyear,
    genders: genderToGenderIdArray,
    image,
  };

  return <View />;
};

export default connect(
  mapStateToProps,
  null,
)(
  reduxForm({
    form: 'updateProfile',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: (value, dispatch) => validateUserInformation(value, dispatch),
    onSubmitSuccess: (result, dispatch, props) => {
      console.log(result);
    },
  })(EditProfileScreen),
);
