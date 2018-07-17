import React from 'react';
import { FlatList, View } from 'react-native';
import EmptyChatMessage from '../EmptyChatMessage';
import InboxCard from '../InboxCard';
import styles from './styles';

class ChatroomsList extends React.Component {
  keyExtractor = (item, index) => 'list-item-' + index;

  renderItem = ({ item }) => {
    return <InboxCard data={item} />;
  };

  render() {
    const sortedChatrooms = this.props.chatrooms
      ? this.props.chatrooms.sort(function(a, b) {
          const aLastMessageTime = a.lastMessage.chat_time;
          const bLastMessageTime = b.lastMessage.chat_time;
          return new Date(bLastMessageTime) - new Date(aLastMessageTime);
        })
      : [];

    return (
      <FlatList
        data={sortedChatrooms}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListEmpyComponent={<EmptyChatMessage goToPeopleView={() => {}} />}
        refreshing={false}
        onRefresh={this.props.onRefresh}
        style={[styles.chatList]}
      />
    );
  }
}

export default ChatroomsList;
