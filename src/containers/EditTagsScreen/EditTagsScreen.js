import React from 'react';
import EditTags from '../../components/EditTags';
import { connect } from 'react-redux';
import { updateUserProfile } from '../../actions/users';
import {
  validateUpdateMatchingInformation,
  validateUpdateTags,
} from './validation';
import { reduxForm } from 'redux-form';
import { updateUserTags } from '../../actions/tags';

const mapStateToProps = state => ({
  personalities: state.personalities.personalitiesList,
  myTags: state.tags.myTags,
  tags: state.tags.tagsList,
});

const EditTagsScreen = props => {
  const { loveTags, hateTags } = props.myTags;
  const lovedTags = [];
  const hatedTags = [];

  loveTags.map(tag => lovedTags.push(tag.id));
  hateTags.map(tag => hatedTags.push(tag.id));

  const initialValues = {
    lovedTags,
    hatedTags,
  };

  return (
    <EditTags
      personalities={props.personalities}
      tags={props.tags}
      initialValues={initialValues}
      initialize={props.initialize}
      dispatch={props.dispatch}
      change={props.change}
      invalid={props.invalid}
      hasChanged={props.dirty}
      handleSubmit={data => props.handleSubmit(data)}
    />
  );
};

export default connect(
  mapStateToProps,
  null,
)(
  reduxForm({
    form: 'updateMatchingInformation',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: (value, dispatch) => validateUpdateTags(value, dispatch),
    onSubmitSuccess: (result, dispatch, props) => {
      dispatch(updateUserTags());
    },
  })(EditTagsScreen),
);
