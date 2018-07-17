import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { disableTouchableOpacity } from '../../actions/TouchableOpacityController';
import styles from './styles';
import { colors, fonts, paddings } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';

const mapDispatchToProps = dispatch => ({
  /*openEvent: (eventId, eventTitle, eventImage, participate, chatroomId) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'EventDetails',
        params: {
          eventId,
          eventTitle,
          eventImage,
          participate,
          chatroomId,
          isFromChat: false,
        },
      }),
    ),*/
});

class EventCard extends Component {
  state = { disabled: false };

  openMap = (city, address) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/maps?address=${city}, ${address}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(
        `http://maps.google.com/maps?address=${city}, ${address}`,
      );
    }
  };

  renderDateAndTime = date => {
    moment.updateLocale('en', {
      calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: 'dddd, Do MMM',
        nextWeek: 'dddd, Do MMM',
        sameElse: 'dddd, Do MMM',
      },
    });

    const eventTime = moment.utc(new Date(date)).format('HH:mm');
    let eventDate;
    new Date().getMonth() === new Date(date).getMonth()
      ? (eventDate = moment.utc(new Date(date)).calendar())
      : (eventDate = moment.utc(new Date(date)).format('dddd, Do MMM'));

    if (eventDate === 'Today' || eventDate === 'Tomorrow') {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontFamily: fonts.SEMI_BOLD }}>{eventDate}</Text>
          <Text style={{ marginLeft: 5 }}>{eventTime}</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: fonts.LIGHT_BOLD }}>{eventDate}</Text>
          <Text style={{ marginLeft: 5 }}>{eventTime}</Text>
        </View>
      );
    }
  };

  render = () => {
    const {
      title,
      description,
      city,
      address,
      date,
      id,
      srcImage,
      avatars,
      first,
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.eventCard, { marginTop: first ? paddings.SM : 0 }]}
        disabled={this.state.disabled}
        onPress={() => {
          disableTouchableOpacity(this);
          this.props.openEvent(
            id,
            title,
            srcImage,
            this.props.userParticipate,
            this.props.chatroomId,
          );
        }}
      >
        <Image
          source={{ uri: srcImage }}
          style={{
            width: '100%',
            height: Dimensions.get('window').width > 320 ? 350 : 200,
          }}
          resizeMode="stretch"
        />
        <View style={[styles.cardSection]}>
          <Text style={[styles.titleTextStyle]}>{title}</Text>
          <Text numberOfLines={3} style={styles.descriptionTextStyle}>
            {description}
          </Text>
          <View style={{ flexDirection: 'row', paddingVertical: paddings.SM }}>
            {avatars.slice(0, 5).map(avatar => avatar)}
            <Text>
              {avatars.length > 0
                ? avatars.length > 5
                  ? `and ${avatars.length - 5} more`
                  : ''
                : 'No participants'}
            </Text>
          </View>
          {this.renderDateAndTime(date)}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => this.openMap(city, address)}
          >
            <Icon
              name="md-pin"
              size={14}
              color={colors.DARK_BLACK}
              style={{ marginRight: paddings.XS }}
            />
            <Text style={[styles.locationText]}>{city ? city : 'Narnia'}</Text>
          </TouchableOpacity>
          {/*<Text
            style={{textAlign: 'right', paddingTop: 5, paddingBottom: 9}}
            onPress={() => this.openMap(city, address)}
          >
            {city ? `${city}` : 'Narnia'}
          </Text>*/}
        </View>

        {/*<View style={[styles.cardSection]}>
          <View style={{paddingTop: 9}}>
            <Text style={titleTextStyle}>{title}</Text>
            <Text numberOfLines={3} style={styles.descriptionTextStyle}>
              {description}
            </Text>
          </View>
        </View>
        <View style={[styles.cardSection]}>
          <View style={{flexDirection: 'row'}}>
            {avatars.slice(0, 5).map(avatar => avatar)}
            <Text>
              {avatars.length > 0 ? avatars.length > 5 ? (
                `and ${avatars.length - 5} more`
              ) : (
                ''
              ) : (
                'No participants'
              )}
            </Text>
          </View>
        </View>

        <View style={[styles.cardSection]}>
          {this.renderDateAndTime(date)}
          <Text
            style={{textAlign: 'right', paddingTop: 5, paddingBottom: 9}}
            onPress={() => this.openMap(city, address)}
          >
            {city ? `${city}` : 'Narnia'}
          </Text>
        </View>*/}
      </TouchableOpacity>
    );
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(EventCard);
