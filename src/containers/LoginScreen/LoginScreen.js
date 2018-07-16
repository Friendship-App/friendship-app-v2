import React from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {login} from "../../actions/login";
import Input from "../../components/Input";
import Footer from "../../components/Footer";

/**
 * Maps the auth state from to the props of this component
 * The auth state contains the logging state
 * @param state
 */
const mapStateToProps = state => ({
  login: state.login,
  auth: state.auth,
});

// Map functions to props
const mapDispatchToProps = dispatch => ({
  authenticate: (email, password) => {
    dispatch(login(email, password));
  },
});

class SignInView extends React.Component {
  state = {
    email: '',
    password: '',
    error: false,
    validationError: '',
    passwordSecure: true,
    showStatus: false,
  };

  renderStatus() {
    const { isLogging, error } = this.props.login;
    const { data, isAuthenticated} = this.props.auth;
    if (error.length > 0) {
      return (
        <Text style={[styles.statusTextStyle]}>
          {error}
        </Text>
      );
    }
    if (this.state.validationError.length > 0) {
      return (
        <Text style={[styles.statusTextStyle]}>
          {this.state.validationError}
        </Text>
      );
    }

    let status = '';
    if (isLogging) {
      status = `Loading ...`;
    }
    if (isAuthenticated && data.decoded) {
      status = `Signed in as ${data.decoded.email}`;
    }

    return (
      <Text style={styles.statusTextStyle} numberOfLines={2}>
        {status}
      </Text>
    );
  }

  signIn() {
    const { email, password } = this.state;
    if (!email || !password) {
      return this.setState({
        validationError: 'Please enter both email & password!',
      });
    }
    this.setState({ showStatus: true });
    this.props.authenticate(email, password);
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={[styles.keyboardView]}
      >
        <ScrollView contentContainerStyle={ styles.scrollViewContent } bounces={false}>
          <Input
            inputProps={{
              placeholder: 'HELLO@FRIENDSHIP.COM',
              keyboardType: 'email-address',
              returnKeyType: 'next',
              autoCapitalize: 'none',
              onSubmitEditing: () => this._password.focus(),
              ref: component => (this._email = component),
            }}
            title="EMAIL"
            handleChange={value => this.setState({ email: value, validationError: '' })}
          />
          <Input
            inputProps={{
              placeholder: '*************',
              returnKeyType: 'go',
              autoCapitalize: 'none',
              onSubmitEditing: () => this.signIn(),
              ref: component => (this._password = component),
            }}
            secureTextEntry
            title="PASSWORD"
            handleChange={value => this.setState({ password: value, validationError: '' })}
          />
          {this.renderStatus()}
        </ScrollView>
        <Footer onPress={() => this.signIn()}>
          <Text style={[styles.footerText]}>Log in</Text>
        </Footer>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInView);
