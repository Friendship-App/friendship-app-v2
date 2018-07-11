import React from 'react';
import {LOCATION} from '../ProgressSteps';
// import {checkErrorMessage, renderErrorMessage, validateLocations,} from '../../../state/validate';
import {Text, View} from 'react-native';
import RegisterHeader from '../RegisterHeader';
import styles from "./styles";
import Footer from "../Footer";
import LocationsList from "../LocationsList";
import {Field} from "redux-form";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  register: state.form.register,
});

/*const renderLocationField = submittedErrors => {
  const err = checkErrorMessage(submittedErrors, 'LOCATIONS');
  return (
    <Container style={{ flex: 1 }}>
      <Part style={{ flex: 2 }}>
        <LabelText style={{ marginTop: 21, marginLeft: 30, marginRight: 30 }}>
          With your location, we will find the happenings, groups and people
          closest to you.
        </LabelText>
      </Part>
      <Part style={{ flex: 8 }}>
        <Field name={'locations'} component={LocationList} />
        <FieldContainer>{err ? renderErrorMessage(err) : null}</FieldContainer>
      </Part>
    </Container>
  );
};*/

const LocationsForm = props => (
  <View
    style={styles.locationsForm}
  >
    <RegisterHeader processStage={LOCATION} headerTitle={'HEY !'}/>
    <View style={styles.message}>
      <Text style={styles.text}>With your location, we will find the happenings, groups and people
        closest to you.</Text>
    </View>
    <Field name={'locations'} component={LocationsList}/>
    {props.register.submitFailed && props.register.submitErrors ? (
      <Text style={[styles.warning]}>{props.register.submitErrors.locations}</Text>) : null}
    <Footer color='blue' onPress={props.handleSubmit}>
      <Text style={styles.next}>Next</Text>
    </Footer>
  </View>
);

export default connect(mapStateToProps)(LocationsForm);
