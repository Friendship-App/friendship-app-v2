import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import Footer from '../Footer';
import styles from './styles';
import BubbleTextInput from '../BubbleTextInput';

class ChatRequest extends Component {
  state = {
    message: '',
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={[styles.container]}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollview]}
          bounces={false}
          ref="scrollView"
        >
          <Text style={[styles.inviteText]}>{`Tell ${
            this.props.reachedUser
          } what you would like to talk about :`}</Text>
          <BubbleTextInput
            placeholder={'Write your message here...'}
            onContentSizeChange={() => this.refs.scrollView.scrollToEnd()}
            onChangeText={text => this.setState({ message: text })}
          />
        </ScrollView>
        <Footer
          color={'blue'}
          disabled={this.state.message.length <= 0}
          onPress={() => this.props.handleSendMessage(this.state.message)}
        >
          <Text style={[styles.send]}>Send</Text>
        </Footer>
      </KeyboardAvoidingView>
    );
  }
}

ChatRequest.propTypes = {};

export default ChatRequest;
