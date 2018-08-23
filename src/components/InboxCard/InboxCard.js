import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { disableTouchableOpacity } from '../../actions/TouchableOpacityController';
import { colors, paddings } from '../../styles';
import { NavigationActions } from 'react-navigation';
import { fetchChatroomMessages, updateMessages } from '../../actions/chatrooms';

const mapStateToProps = state => ({
  auth: state.auth,
  chatrooms: state.chatrooms,
});

const mapDispatchToProps = dispatch => ({
  updateReadMessages: chatroomId => dispatch(updateMessages(chatroomId)),
  openChatView: (
    chatroomId,
    isEventChatroom,
    image,
    title,
    participantId,
    active,
  ) => {
    dispatch(fetchChatroomMessages(chatroomId));
    dispatch(
      NavigationActions.navigate({
        routeName: 'Chat',
        params: {
          chatroomId,
          isEventChatroom,
          image,
          title,
          participantId,
          active,
        },
      }),
    );
  },
});

const initialState = {
  disabled: false,
  isLoading: true,
};

class InboxCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    const newTotalNumberOfMessages = nextProps.data.messages.length;
    return (
      newTotalNumberOfMessages !== this.props.data.messages.length ||
      nextProps.data.messages[newTotalNumberOfMessages - 1].read !==
        this.props.data.messages[nextProps.data.messages.length - 1].read
    );
  }

  getMessageTime = lastMessageTime => {
    const currentDay = moment().format('dddd');
    const currentMonth = moment().format('MMM');
    const currentYear = moment().format('YYYY');

    if (currentYear === moment(lastMessageTime).format('YYYY')) {
      if (currentMonth === moment(lastMessageTime).format('MMM')) {
        if (currentDay === moment(lastMessageTime).format('dddd')) {
          return moment(lastMessageTime).format('HH:mm');
        }
        return moment(lastMessageTime).format('dddd');
      }
      return moment(lastMessageTime).format('dddd MMM');
    }
    return moment(lastMessageTime).format('dddd MMM YYYY');
  };

  getTime = () => {
    const { lastMessage } = this.props.data;
    const lastMessageTime = lastMessage.chat_time;
    return this.getMessageTime(lastMessageTime);
  };

  handlePress = () => {
    const { chatroomId, isEventChatroom, participantsData } = this.props.data;
    const userId = this.props.auth.data.decoded.id;
    let image, title, participantId, active;
    if (!isEventChatroom) {
      const participant = participantsData.find(
        participant => participant.id !== userId,
      );
      image = participant.image;
      title = participant.username;
      participantId = participant.id;
      active = participant.active;
    } else {
      image = this.props.data.eventData.eventImage;
      title = this.props.data.eventData.title;
    }
    disableTouchableOpacity(this);
    this.props.updateReadMessages(chatroomId);
    this.props.openChatView(
      chatroomId,
      isEventChatroom,
      image,
      title,
      participantId,
      active,
    );
  };

  getUnreadMessages = (unreadMessages, unreadMessagesText) => {
    if (unreadMessages > 0) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Icon
            name={'md-mail'}
            color={colors.ORANGE}
            size={10}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.inboxCardMessage}>{unreadMessagesText}</Text>
        </View>
      );
    }
  };

  getUserActive = active => {
    if (!active) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Icon
            name={'md-information-circle'}
            color={colors.ORANGE}
            size={15}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.inboxCardMessage}>This user left ...</Text>
        </View>
      );
    }
  };

  render() {
    // const { creator, receiver, messages, event } = this.props.data;
    const { unreadMessages, lastMessage, isEventChatroom } = this.props.data;

    let time, unreadMessagesText, username, avatar, active;

    time = this.getTime();

    unreadMessagesText =
      unreadMessages > 0 ? `( ${unreadMessages} unread messages )` : '';

    if (isEventChatroom) {
      username = this.props.data.eventData.title;
      avatar = this.props.data.eventData.eventImage;
      active = this.props.data.eventData.active;
    } else {
      const otherParticipant = this.props.data.participantsData.find(
        participant => participant.id !== this.props.auth.data.decoded.id,
      );
      username = otherParticipant.username;
      avatar = otherParticipant.image;
      active = otherParticipant.active;
    }

    if (username.length > 15) {
      username = username.substring(0, 15);
      username += '...';
    }

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        disabled={this.state.disabled}
        style={styles.inboxCard}
      >
        <Image
          source={{ uri: avatar }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View style={styles.inboxCardContent}>
          <View style={styles.inboxCardHeader}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.inboxCardName}
            >
              {username}
            </Text>
            <Text style={styles.inboxCardTime}>{time}</Text>
          </View>
          {this.getUnreadMessages(unreadMessages, unreadMessagesText)}
          {this.getUserActive(active)}
          <Text numberOfLines={1} style={styles.inboxCardMessage}>
            {lastMessage.textMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  inboxCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: paddings.LG,
    marginBottom: paddings.LG,
  },
  inboxCardHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inboxCardName: {
    fontSize: 18,
    color: '#4a4a4a',
  },
  inboxCardTime: {
    fontSize: 10,
    color: '#5c5c5c',
  },
  inboxCardMessage: {
    fontSize: 13,
    color: '#4a4a4a',
  },
  iconHolder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#e8e9e8',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userEmoji: {
    fontSize: 20,
    padding: 8,
  },
  inboxCardContent: {
    flex: 1,
    marginLeft: paddings.SM,
    justifyContent: 'center',
    paddingBottom: paddings.XS,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.MEDIUM_GREY,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxCard);
