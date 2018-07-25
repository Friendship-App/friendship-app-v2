import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../styles';
import Tag from '../Tag';
import styles from './styles';

const initialState = {
  yeahsTextColor: colors.DARK_BLUE,
  nahsTextColor: colors.DARK_GREY,
  tabIndex: true,
};

export default class ShowTags extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //allow when we change the tab to have the good colors
  onChangeTab() {
    const { tabIndex } = this.state;
    let tmpState;
    switch (tabIndex) {
      case false:
        tmpState = initialState;
        break;
      default:
        tmpState = {
          yeahsTextColor: colors.DARK_GREY,
          nahsTextColor: colors.ORANGE,
          tabIndex: false,
        };
    }
    this.setState(tmpState);
  }

  renderLoveAndHatePicker() {
    return (
      <View style={[styles.picker]}>
        <TouchableOpacity
          style={[
            styles.loveAndHatePicker,
            {
              borderBottomColor: this.state.yeahsTextColor,
              borderBottomWidth: this.state.tabIndex ? 4 : 0,
            },
          ]}
          onPress={() => {
            if (!this.state.tabIndex) {
              this.onChangeTab();
            }
          }}
        >
          <Text
            style={[
              styles.loveAndHatePickerText,
              {
                color: this.state.yeahsTextColor,
              },
            ]}
          >
            YEAHS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.loveAndHatePicker,
            {
              borderBottomColor: this.state.nahsTextColor,
              borderBottomWidth: !this.state.tabIndex ? 4 : 0,
            },
          ]}
          onPress={() => {
            if (this.state.tabIndex) {
              this.onChangeTab();
            }
          }}
        >
          <Text
            style={[
              styles.loveAndHatePickerText,
              {
                color: this.state.nahsTextColor,
              },
            ]}
          >
            NAHS
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderSendMsg() {
    const openChat = () => {
      this.props.existingChatRoom !== undefined
        ? this.props.openChatView()
        : this.props.onChatRequest();
    };

    if (!this.props.myProfile) {
      return (
        <TouchableOpacity onPress={openChat} style={[styles.buttonStyle]}>
          <Text style={[styles.textButtonStyle]}>Send Message</Text>
        </TouchableOpacity>
      );
    }
  }

  renderTags(tags) {
    const { tabIndex } = this.state;
    return (
      <View style={[styles.tagsContainer]}>
        {tags.length > 0 ? (
          <View style={styles.tagList}>
            {tags.map(tag => <Tag key={tag.id} data={tag} dark={!tabIndex} />)}
          </View>
        ) : (
          <Text style={[styles.noTagsMessage]}>
            No interests mentioned yet.
          </Text>
        )}
      </View>
    );
  }

  render = () => {
    let tags;

    switch (this.state.tabIndex) {
      case true:
        tags = this.props.love;
        break;
      default:
        tags = this.props.hate;
    }
    return (
      <View style={[styles.container]}>
        {this.renderLoveAndHatePicker()}
        {this.renderTags(tags)}
        {this.renderSendMsg()}
      </View>
    );
  };
}
