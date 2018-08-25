import React from 'react';
import ReportForm from '../../components/ReportForm';
import { connect } from 'react-redux';
import { reportUser } from '../../actions/users';

const mapStateToProps = state => ({
  reportedUser: state.users.userDetails.data,
});

const mapDispatchToProps = dispatch => ({
  report: reason => dispatch(reportUser(reason)),
});

const ReportUserScreen = props => {
  return (
    <ReportForm
      data={props.reportedUser}
      reportType={'user'}
      handlePress={reason => props.report(reason)}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportUserScreen);
