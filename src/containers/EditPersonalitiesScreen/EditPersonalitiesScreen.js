import React from 'react';
import EditPersonalities from '../../components/EditPersonalities';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  personalities: state.personalities.personalitiesList,
  userPersonalities: state.personalities.myPersonalities,
});

const mapDispatchToProps = dispatch => ({});

const EditPersonalitiesScreen = props => (
  <EditPersonalities
    personalities={props.personalities}
    userPersonalities={props.userPersonalities}
  />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPersonalitiesScreen);
