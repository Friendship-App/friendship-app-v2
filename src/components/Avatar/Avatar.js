import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { paddings } from '../../styles';

export default class Avatar extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.avatarContainer,
          {
            backgroundColor: this.props.selected ? '#ff8a65' : '#ffffff',
            marginLeft: this.props.first ? paddings.LG : 0,
          },
        ]}
        onPress={() => this.props.updateAvatar(this.props.avatar)}
      >
        <Image source={{ uri: this.props.avatar }} style={styles.avatars} />
      </TouchableOpacity>
    );
  }
}

const styles = {
  avatars: {
    height: 60,
    width: 60,
  },
  avatarContainer: {
    height: 70,
    width: 70,
    backgroundColor: '#ffffff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
};
