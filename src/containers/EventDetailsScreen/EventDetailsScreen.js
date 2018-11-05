import React from 'react';
import { ScrollView, View } from 'react-native';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import EventTopPart from '../../components/EventTopPart';
import { DescriptionWrapper } from '../../components/Layout/Layout';
import { Description } from '../../components/Layout/TextLayout';
import EventBottomPart from '../../components/EventBottomPart';
import { addUserToEvent, removeUserFromEvent } from '../../actions/events';
import { NavigationActions } from 'react-navigation';
import { fetchLocations } from '../../actions/locations';

const mapStateToProps = state => ({
  events: state.events,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  joinEvent: (eventId, navigation) => {
    dispatch(addUserToEvent(eventId));
    dispatch(
      navigation.setParams({
        userParticipate: !navigation.state.params.userParticipate,
      }),
    );
  },
  leaveEvent: (eventId, navigation) => {
    dispatch(removeUserFromEvent(eventId));
    dispatch(
      navigation.setParams({
        userParticipate: !navigation.state.params.userParticipate,
      }),
    );
  },
  editEvent: () => {
    dispatch(fetchLocations());
    dispatch(NavigationActions.navigate({ routeName: 'EditEvent' }));
  },
  report: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ReportEvent',
      }),
    ),
});

const EventDetailsScreen = props => {
  const { events, joinEvent, leaveEvent, editEvent } = props;

  if (events.isLoadingEventDetails) {
    return <Loading />;
  }

  const {
    id,
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
  const params = props.navigation.state.params;
  const participate = params && params.userParticipate;
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
          report={props.report}
          participants={eventParticipants}
          personalities={eventPersonality}
          tags={eventTopTags}
          joinEvent={() => {
            joinEvent(id, props.navigation);
          }}
          leaveEvent={() => {
            leaveEvent(id, props.navigation);
          }}
          editEvent={editEvent}
          participate={participate}
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
  mapDispatchToProps,
)(EventDetailsScreen);
