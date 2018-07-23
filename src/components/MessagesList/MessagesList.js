import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import styles from './styles';
import { colors } from '../../styles';
import moment from 'moment';

class MessagesList extends React.Component {
  keyExtractor = (item, index) => `msg-${index}`;

  getMessageTime = lastMessageTime => {
    const currentDay = moment().format('dddd');
    const currentMonth = moment().format('MMM');
    const currentYear = moment().format('YYYY');

    if (
      currentYear === moment(lastMessageTime).format('YYYY') &&
      currentMonth === moment(lastMessageTime).format('MMM') &&
      currentDay === moment(lastMessageTime).format('dddd')
    ) {
      return moment(lastMessageTime).format('HH:mm');
    }
    return moment(lastMessageTime).format('dddd - HH:mm');
  };

  renderItem = ({ item }) => {
    const textAlign =
      item.senderId === this.props.currentUserId ? 'right' : 'left';
    const messageCardStyle =
      item.senderId === this.props.currentUserId
        ? styles.SendCard
        : styles.ReceiveCard;
    const CardMargin =
      item.senderId === this.props.currentUserId
        ? { marginRight: 20 }
        : { marginLeft: 20 };

    let time = this.getMessageTime(item.chatTime);

    return (
      <View
        style={[
          styles.Card,
          CardMargin,
          { display: 'flex', flexDirection: 'row' },
        ]}
      >
        {item.senderId === this.props.currentUserId ? null : (
          <Image
            source={require('../../../assets/chatBubble/chatBubbleOther.png')}
            style={{ tintColor: colors.MEDIUM_GREY }}
          />
        )}
        <View style={messageCardStyle}>
          <Text
            style={{
              textAlign,
              fontSize: 10,
              color: '#60686d',
              marginBottom: 10,
            }}
          >
            {time}
          </Text>
          <Text style={{ color: '#4a4a4a', textAlign }}>
            {item.textMessage}
          </Text>
        </View>
        {item.senderId === this.props.currentUserId ? (
          <Image
            source={require('../../../assets/chatBubble/chatBubbleMe.png')}
            style={{ tintColor: colors.ORANGE }}
          />
        ) : null}
      </View>
    );
  };

  render() {
    const { messages } = this.props;
    return (
      <FlatList
        inverted
        data={messages}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={[styles.messagesList]}
      />
    );
  }
}

export default MessagesList;
