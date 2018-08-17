import React from 'react';
import { connect } from 'react-redux';
import EventFormScreen from '../EventFormScreen/EventFormScreen';

const mapStateToProps = state => ({
  events: state.events,
});

const UpdateEventScreen = props => {
  return <EventFormScreen edit eventDetails={props.events.eventDetails} />;
};

export default connect(
  mapStateToProps,
  null,
)(UpdateEventScreen);
