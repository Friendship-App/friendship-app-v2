import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import { colors } from '../../styles';
import { disableTouchableOpacity } from '../../actions/TouchableOpacityController';
import Icon from 'react-native-vector-icons/Ionicons';
import EventsList from '../../components/EventsList';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import { fetchEvents } from '../../actions/events';
import { fetchLocations } from '../../actions/locations';

const mapStateToProps = state => ({
  events: state.events,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  refreshEvents: () => dispatch(fetchEvents()),
  openEventForm: () => {
    dispatch(fetchLocations());
    dispatch(NavigationActions.navigate({ routeName: 'EventForm' }));
  },
});

class EventsScreen extends React.Component {
  state = { disabled: false };

  render() {
    const { events, auth, openEventForm, refreshEvents } = this.props;

    if (events.isLoading) {
      return <Loading />;
    }

    return (
      <View style={[styles.eventsList]}>
        <EventsList
          events={events.events}
          onRefresh={refreshEvents}
          userId={auth.data.decoded.id}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            height: 60,
            width: 60,
            display: 'flex',
            backgroundColor: colors.ORANGE,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={this.state.disabled}
          activeOpacity={0.8}
          onPress={() => {
            disableTouchableOpacity(this);
            openEventForm();
          }}
        >
          <Icon name="md-add" size={45} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsScreen);
