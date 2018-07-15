import React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from "react-native";
import RegisterHeader from "../../components/RegisterHeader";
import {MATCHING_AGREEMENT} from "../../components/ProgressSteps";
import styles from "./styles";
import BubbleTextInput from "../../components/BubbleTextInput";
import Footer from "../../components/Footer";
import {Field, reduxForm, SubmissionError} from "redux-form";
import {connect} from "react-redux";
import {register} from '../../actions/register';

const mapStateToProps = state => ({
  registration: state.form.register,
});

const mapDispatchToProps = dispatch => ({
  register: () => {
    dispatch(register());
  }
});

class DescriptionScreen extends React.Component {
  render() {
    const {registration} = this.props;
    return (
      <KeyboardAvoidingView style={[styles.descriptionScreen]} behavior="padding" enabled>
        <ScrollView contentContainerStyle={{flex: 1}} bounces={false} ref="scrollView">
          <RegisterHeader headerTitle={'FINDING THE RIGHT PEOPLE FOR YOU'} processStage={MATCHING_AGREEMENT}/>
          <View style={[styles.description]}>
            <Text style={[styles.title]}>WOULD YOU LIKE TO ADD A SMALL BIO?</Text>
            <Field
              name='description'
              component={BubbleTextInput}
              placeholder={'ADD A DESCRIPTION \n \nYou can tell your future friends about your interests, what you’re looking for or what you think friendship is…'}
              onContentSizeChange={(evt) => this.refs.scrollView.scrollToEnd()}
              onChangeText={text => this.props.change('description', text)}
            />
            {registration && registration.submitFailed && registration.submitErrors && registration.submitErrors.description ? (
              <Text style={styles.warning}>{registration.submitErrors.description}</Text>
            ) : null}
          </View>
        </ScrollView>
        <Footer color={'blue'} onPress={data => this.props.handleSubmit(data)}>
          <Text style={[styles.next]}>Next</Text>
        </Footer>
      </KeyboardAvoidingView>
    )
  }
}

function validateDescription (values) {
  const {description} = values;
  if (description.length <= 0) {
    throw new SubmissionError({
      description: 'Write a description.',
      _error: 'Login failed !',
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'register',
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    onSubmit: validateDescription,
    onSubmitSuccess: (result, dispatch, props) => {
      props.register();
    }
  })(DescriptionScreen)
);