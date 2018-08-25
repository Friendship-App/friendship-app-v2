import React from 'react';
import ReportForm from '../../components/ReportForm';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { reportEvent } from '../../actions/events';

const mapStateToProps = state => ({
  reportedEvent: state.events.eventDetails,
});

const mapDispatchToProps = dispatch => ({
  report: reason => dispatch(reportEvent(reason)),
});

const ReportEventScreen = props => {
  return (
    <ReportForm
      data={props.reportedEvent}
      reportType={'event'}
      handlePress={reason => {
        props.report(reason);
        Alert.alert('Report', 'Thank you for reporting this event.', [
          {
            text: 'OK',
            onPress: () => props.navigation.goBack(),
          },
        ]);
      }}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportEventScreen);
