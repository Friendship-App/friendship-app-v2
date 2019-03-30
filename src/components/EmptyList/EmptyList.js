import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { Text, View } from 'react-native';

const fields = {
  chat: {
    title: 'Get busy chatting!',
    message:
      'You have no active chats yet. To start a new chat, first find a person that seems interesting to you. Open their profile, see what you have in common and take it from there.',
    redirectText: 'Browse profiles',
  },
  event: {
    title: 'No activities in your location for now',
    message:
      'There are no available activities around you for the moment. But, you can start the movement and create one to meet new people!',
    redirectText: '',
  },
};

class EmptyList extends Component {
  render() {
    const { type, redirect } = this.props;
    let title, message, link, backgroundStyle;
    switch (type) {
      case 'event':
        title = fields.event.title;
        message = fields.event.message;
        link = fields.event.redirectText;
        backgroundStyle = styles.emptyEvent;
        break;
      default:
        title = fields.chat.title;
        message = fields.chat.message;
        link = fields.chat.redirectText;
        backgroundStyle = styles.emptyChat;
    }
    return (
      <View style={[backgroundStyle]}>
        <Text style={[styles.title, styles.message]}>{title}</Text>
        <Text style={[styles.message]}>{message}</Text>
        {type === 'event' ? null : (
          <Text style={[styles.redirect]} onPress={redirect}>
            {link}
          </Text>
        )}
      </View>
    );
  }
}

EmptyList.propTypes = {};

export default EmptyList;
