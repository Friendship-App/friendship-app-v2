import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import ParticipantList from './ParticipantList';
import Tag from '../Tag';
import Personality from '../Personality';

const ButtonOption = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 30;
  margin-top: 30;
`;

export default class EventBottomPart extends PureComponent {
  renderJoinButton(isHost, eventFull) {
    if (isHost === true) {
      return (
        <View style={{ backgroundColor: '#ffffff', height: 100 }}>
          <ButtonOption>
            <TouchableOpacity
              style={styles.buttonStyle}
              // onPress={() => this.props.openEditForm(this.props.eventDetails)}
            >
              <Text style={styles.textButtonStyle}>Manage Event</Text>
            </TouchableOpacity>
          </ButtonOption>
        </View>
      );
    }
    if (eventFull === true) {
      return (
        <View style={{ backgroundColor: '#ffffff', height: 100 }}>
          <ButtonOption>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.textButtonStyle}>Event Is Full</Text>
            </TouchableOpacity>
          </ButtonOption>
        </View>
      );
    }
    if (this.props.participate) {
      return (
        <View style={{ backgroundColor: '#ffffff', height: 100 }}>
          <ButtonOption>
            <TouchableOpacity
              onPress={this.props.leaveEvent}
              style={styles.buttonStyle}
            >
              <Text style={styles.textButtonStyle}>Leave this</Text>
            </TouchableOpacity>
          </ButtonOption>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: '#ffffff', height: 100 }}>
          <ButtonOption>
            <TouchableOpacity
              onPress={this.props.joinEvent}
              style={styles.buttonStyle}
            >
              <Text style={styles.textButtonStyle}>Join this</Text>
            </TouchableOpacity>
          </ButtonOption>
        </View>
      );
    }
  }

  renderPersonalities = () => {
    return this.props.personalities.map(personality => {
      return (
        <Personality
          key={personality.name}
          personality={personality.name}
          amount={personality.Number_of_Personalities}
          small
        />
      );
    });
  };

  render = () => {
    const yeahs = [];
    this.props.tags.map(tag => {
      if (tag.love) {
        yeahs.push(tag);
      }
    });
    const naahs = [];
    this.props.tags.map(tag => {
      if (!tag.love) {
        naahs.push(tag);
      }
    });

    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        {this.renderJoinButton(this.props.isHost, this.props.eventFull)}
        <ParticipantList
          participants={this.props.participants}
          currentUser={this.props.currentUser}
          hostId={this.props.hostId}
        />
        <Text style={styles.groupTextStyle}>GROUP PERSONALITIES</Text>
        <View style={styles.personalitiesView}>
          {this.renderPersonalities()}
        </View>
        <Text style={styles.groupTagsTextStyle}>TOP YEAHS</Text>
        <View style={styles.tagList}>
          {yeahs.map((tag, index) => (
            <Tag key={index} data={tag} amount={tag.count} />
          ))}
        </View>
        <Text style={styles.groupTagsTextStyle}>TOP NAAHS</Text>
        <View style={styles.tagList}>
          {naahs.map((tag, index) => (
            <Tag key={index} data={tag} amount={tag.count} dark />
          ))}
        </View>
        {this.renderJoinButton(this.props.isHost, this.props.eventFull)}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tagList: {
    marginVertical: 15,
    marginHorizontal: 22,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  groupTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 25,
  },
  groupTagsTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginLeft: 15,
    marginTop: 25,
  },
  personalitiesView: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
    color: '#2d4359',
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
    backgroundColor: '#F9F6F1',
  },
});
