import React from 'react';
import { filter } from 'lodash';
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
  const { tags, myTags } = props;
  const { loveTags, hateTags } = myTags;
  const lovedTags = [];
  const hatedTags = [];

  loveTags.map(tag => lovedTags.push(tag.id));
  hateTags.map(tag => hatedTags.push(tag.id));

  const initialValues = {
    lovedTags,
    hatedTags,
  };

  const baseTags = filter(tags, ({ type }) => type === 'base');
  const newTags = filter(tags, ({ type }) => type === 'alternating');

  return (
    <EditTags
      personalities={props.personalities}
      baseTags={baseTags}
      newTags={newTags}
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
