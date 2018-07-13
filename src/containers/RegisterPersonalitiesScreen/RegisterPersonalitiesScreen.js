import React from 'react';
import PersonalitiesForm from "../../components/PersonalitiesForm";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {NavigationActions} from "react-navigation";

const mapDispatchToProps = dispatch => ({
  goToUserInformationForm: () => dispatch(NavigationActions.navigate({routeName: 'Tags'}))
});

const RegisterPersonalitiesScreen = props => (
  <PersonalitiesForm handleSubmit={(data) => props.handleSubmit(data)} change={(data) => props.change(data)}/>
);

export default connect(null, mapDispatchToProps)(
  reduxForm({
    form: 'register',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: () => {},
    onSubmitSuccess: (result, dispatch, props) => {
      props.goToUserInformationForm();
    }
  })(RegisterPersonalitiesScreen)
);