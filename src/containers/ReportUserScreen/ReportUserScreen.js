import React from 'react';
import ReportForm from '../../components/ReportForm';
import { connect } from 'react-redux';
import { reportUser } from '../../actions/users';
import { Alert } from 'react-native';

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
      handlePress={reason => {
        props.report(reason);
        Alert.alert('Report', 'Thank you for reporting this user.', [
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
)(ReportUserScreen);
