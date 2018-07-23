import React from 'react';
import { FlatList, Image } from 'react-native';
import EventCard from '../EventCard';

const keyExtractor = event => 'list-item-' + event.id;

const renderItem = (item, userId, index) => {
  const avatars = [];
  let userParticipate = false;
  if (item.participants > 0) {
    item.participantsDetails.map(participant => {
      if (!userParticipate) {
        userParticipate = participant.id === userId;
      }
      if (userId !== item.hostId) {
        avatars.push(
          <Image
            source={{ uri: participant.avatar }}
            style={{ width: 15, height: 15, marginRight: 2 }}
            key={`avatar-${participant.username}`}
          />,
        );
      }
    });
  }

  return (
    <EventCard
      first={index === 0}
      title={item.title}
      description={item.description}
      city={item.city}
      address={item.address}
      date={item.date}
      id={item.id}
      srcImage={item.eventImage}
      avatars={avatars}
      hostId={item.hostId}
      userParticipate={userParticipate}
      chatroomId={item.chatroomId}
    />
  );
};

class EventsList extends React.Component {
  render() {
    const { events, onRefresh, userId } = this.props;
    return (
      <FlatList
        data={events}
        keyExtractor={keyExtractor}
        renderItem={({ item, index }) => renderItem(item, userId, index)}
        refreshing={false}
        onRefresh={onRefresh}
        style={{ width: '100%' }}
      />
    );
  }
}

export default EventsList;
