import React from 'react';
import {KeyboardAvoidingView} from "react-native";
import {YOUR_PROFILE} from "../ProgressSteps";
import RegisterHeader from "../RegisterHeader";
import styles from "./styles";

class UserInformationForm extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={[styles.userInformationForm]}>
        <RegisterHeader processStage={YOUR_PROFILE} headerTitle={'YOUR PROFILE'}/>

      </KeyboardAvoidingView>
    )
  }
}

export default UserInformationForm;