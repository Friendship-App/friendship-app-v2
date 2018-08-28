import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import Footer from '../Footer';
import styles from './styles';
import { change } from 'redux-form';
import RegisterTextInput from '../RegisterTextInput';
import { connect } from 'react-redux';
import Button from '../Button';
import { colors, paddings } from '../../styles';
import { deleteUser } from '../../actions/users';
import { logOut } from '../../actions/login';

function renderField(field, key) {
  return (
    <View key={key}>
      <RegisterTextInput
        name={field.name}
        keyboardType={field.keyboardType}
        returnKeyType={field.returnKeyType}
        placeholder={field.placeholder}
        secureTextEntry={field.secureTextEntry}
        onChangeText={field.onChangeText}
        reference={field.reference}
        navigate={field.navigate}
        key={field.name}
        helperText={field.helperText}
        err={field.err}
        value={field.value}
        multiline={field.multiline}
        title={field.title}
      />
    </View>
  );
}

function renderEmailAndPasswordFields(props) {
  const { invalid, dispatch } = props;

  let email, password, passwordConfirmation;
  if (invalid) {
    email = props.updateAccount.submitErrors.email;
    password = props.updateAccount.submitErrors.password;
    passwordConfirmation =
      props.updateAccount.submitErrors.passwordConfirmation;
  }

  const fields = [
    {
      title: 'EMAIL',
      name: 'email',
      returnKeyType: 'next',
      placeholder: '',
      secureTextEntry: false,
      onChangeText: values =>
        dispatch(change('updateAccount', 'email', values)),
      navigate: () => this._password.getRenderedComponent().focus(),
      err: email,
      value: props.initialValues.email,
    },
    {
      title: 'CHANGE PASSWORD',
      name: 'password',
      returnKeyType: 'next',
      placeholder: '**********',
      secureTextEntry: true,
      onChangeText: values =>
        props.dispatch(change('updateAccount', 'password', values)),
      navigate: () => this._passwordConfirmation.getRenderedComponent().focus(),
      reference: field => (this._password = field),
      err: password,
    },
    {
      title: 'CONFIRM PASSWORD',
      name: 'passwordConfirmation',
      placeholder: '**********',
      secureTextEntry: true,
      onChangeText: values =>
        props.dispatch(change('updateAccount', 'passwordConfirmation', values)),
      reference: field => (this._passwordConfirmation = field),
      err: passwordConfirmation,
    },
  ];

  return fields.map(field => renderField(field, field.name));
}

function renderDeleteAccountField(deleteAccount) {
  return (
    <Button
      text={'Delete account'}
      color={'white'}
      type="primary"
      width="md"
      onPress={deleteAccount}
      customStyle={{
        backgroundColor: colors.DARK_ORANGE,
        alignSelf: 'center',
        marginTop: paddings.MD,
      }}
    />
  );
}

const mapStateToProps = state => ({
  updateAccount: state.form.updateAccount,
});

const mapDispatchToProps = dispatch => ({
  // delete: () => dispatch(logOut())
  delete: () => {
    dispatch(deleteUser());
    dispatch(logOut());
  },
});

class EditAccount extends Component {
  componentWillMount() {
    this.props.initialize({
      ...this.props.initialValues,
      oldValues: this.props.initialValues,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={[styles.container]}>
        <ScrollView bounces={false} ref="scrollView">
          <Text style={[styles.title]}>EDIT ACCOUNT</Text>
          {renderEmailAndPasswordFields(this.props)}
          {renderDeleteAccountField(this.props.delete)}
        </ScrollView>
        <Footer
          disabled={!this.props.hasChanged}
          color="blue"
          onPress={this.props.handleSubmit}
        >
          <Text style={styles.next}>Update</Text>
        </Footer>
      </KeyboardAvoidingView>
    );
  }
}

EditAccount.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditAccount);
