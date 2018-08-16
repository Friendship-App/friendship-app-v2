import React from 'react';
import EditPersonalities from '../../components/EditPersonalities';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { validateUpdatePersonalities } from './validation';
import { updateUserPersonalities } from '../../actions/personalities';

const mapStateToProps = state => ({
  personalities: state.personalities.personalitiesList,
  myPersonalities: state.personalities.myPersonalities,
});

const mapDispatchToProps = dispatch => ({});

const EditPersonalitiesScreen = props => {
  const userPersonalities = [];
  props.myPersonalities.map(userPersonality =>
    userPersonalities.push(userPersonality.id),
  );

  const initialValues = {
    personalities: userPersonalities,
  };

  return (
    <EditPersonalities
      personalities={props.personalities}
      initialValues={initialValues}
      initialize={props.initialize}
      dispatch={props.dispatch}
      change={props.change}
      hasChanged={props.dirty}
      handleSubmit={data => props.handleSubmit(data)}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'updatePersonalities',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: (value, dispatch) => validateUpdatePersonalities(value, dispatch),
    onSubmitSuccess: (result, dispatch, props) => {
      dispatch(updateUserPersonalities());
    },
  })(EditPersonalitiesScreen),
);
