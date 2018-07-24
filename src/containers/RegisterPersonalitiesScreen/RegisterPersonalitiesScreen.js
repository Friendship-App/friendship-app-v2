import React from 'react';
import PersonalitiesForm from '../../components/PersonalitiesForm';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import { validatePersonalities } from './validation';

const mapDispatchToProps = dispatch => ({
  goToUserTagsForm: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Tags' })),
});

const RegisterPersonalitiesScreen = props => (
  <PersonalitiesForm
    handleSubmit={data => props.handleSubmit(data)}
    change={props.change}
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
    onSubmit: validatePersonalities,
    onSubmitSuccess: (result, dispatch, props) => {
      props.goToUserTagsForm();
    },
  })(RegisterPersonalitiesScreen),
);
