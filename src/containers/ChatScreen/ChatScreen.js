import React from 'react';
import Loading from '../../components/Loading/Loading';
import { connect } from 'react-redux';
import MessagesList from '../../components/MessagesList';
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, paddings } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { disableTouchableOpacity } from '../../actions/TouchableOpacityController';
import { socket } from '../../utils/socket';
import { sendMessage } from '../../actions/messages';

const mapStateToProps = state => ({
  chatrooms: state.chatrooms,
  currentUserId: state.auth.data.decoded.id,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (chatroomId, textMessage, receiverId) =>
    dispatch(sendMessage(chatroomId, textMessage, receiverId)),
});

class ChatScreen extends React.Component {
  state = {
    text: '',
    disabled: false,
  };

  sendMessage = () => {
    const chatroomId = this.props.navigation.state.params.chatroomId;
    const textMessage = this.state.text;
    const receiverId = [];
    const chatroom = this.props.chatrooms.chatrooms.find(
      chatroom => chatroom.chatroomId === chatroomId,
    );
    const { participantsData } = chatroom;
    if (participantsData) {
      participantsData.map(participant => {
        if (participant.id !== this.props.currentUserId) {
          receiverId.push(participant.id);
        }
      });
    }
    this.props.sendMessage(chatroomId, textMessage, receiverId);
    socket.emit('message', {
      chatroomId,
      textMessage,
      senderId: this.props.currentUserId,
    });
    this.setState({ text: '' });
  };

  render() {
    const { chatrooms, currentUserId } = this.props;
    const { text, disabled } = this.state;
    if (chatrooms.isLoadingMessages) {
      return <Loading />;
    }

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: colors.DUST_WHITE }}
      >
        <MessagesList
          messages={chatrooms.messages}
          currentUserId={currentUserId}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: paddings.XXS,
            minHeight: 50,
            // backgroundColor: headerPalette.colors.HEADER,
            backgroundColor: 'transparent',
            // borderTopWidth: 0.5,
            // borderTopColor: headerPalette.colors.HEADER_BORDER_BOTTOM
          }}
        >
          <TextInput
            style={{
              backgroundColor: colors.MEDIUM_GREY,
              flex: 1,
              height: '100%',
              marginRight: paddings.XS,
              paddingHorizontal: paddings.XS,
              borderRadius: 25,
            }}
            value={text}
            onChangeText={value => this.setState({ text: value })}
            underlineColorAndroid={'transparent'}
            multiline={true}
          />
          <TouchableOpacity
            onPress={() => {
              disableTouchableOpacity(this);
              this.sendMessage();
            }}
            disabled={!text.trim().length > 0 || disabled}
          >
            <Icon
              name={'md-send'}
              color={
                this.state.text.trim().length > 0
                  ? colors.ORANGE
                  : colors.DARK_GREY
              }
              size={26}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
