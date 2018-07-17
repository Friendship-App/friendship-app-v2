import React from 'react';
import { ScrollView, View } from 'react-native';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import EventTopPart from '../../components/EventTopPart';
import { DescriptionWrapper } from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';
import EventBottomPart from '../../components/EventBottomPart';

const mapStateToProps = state => ({
  events: state.events,
  auth: state.auth,
});

const EventDetailsScreen = props => {
  const { events } = props;

  if (events.isLoadingEventDetails) {
    return <Loading />;
  }

  const {
    title,
    address,
    city,
    eventImage,
    eventDate,
    hostId,
    description,
    eventParticipants,
    eventPersonality,
    eventTopTags,
    maxParticipants,
  } = events.eventDetails;

  return (
    <ScrollView style={{ display: 'flex', height: '100%', width: '100%' }}>
      <View style={{ flex: 1 }}>
        <EventTopPart
          eventTitle={title}
          address={address}
          city={city}
          srcImage={eventImage}
          eventDate={eventDate}
          isHost={hostId === props.auth.data.decoded.id}
        />
        <DescriptionWrapper>
          <Description>{description}</Description>
        </DescriptionWrapper>
        <EventBottomPart
          participants={eventParticipants}
          personalities={eventPersonality}
          tags={eventTopTags}
          onButtonPress={() => console.log('pressed...')}
          participate={props.navigation.state.params.userParticipate}
          isHost={hostId === props.auth.data.decoded.id}
          eventFull={eventParticipants.length >= maxParticipants}
          currentUser={props.auth.data.decoded.id}
          hostId={hostId}
        />
      </View>
    </ScrollView>
  );
};

export default connect(
  mapStateToProps,
  null,
)(EventDetailsScreen);
