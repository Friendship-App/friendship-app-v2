import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';
import Tag from '../Tag';

const initialState = {
  yeahsTextColor: colors.DARK_BLUE,
  nahsTextColor: colors.DARK_GREY,
  btnBackColor: '#faf5f0',
  btnTextColor: '#2d4359',
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
          btnBackColor: '#2a343c',
          btnTextColor: '#faf5f0',
          tabIndex: false,
        };
    }
    this.setState(tmpState);
  }

  renderSendMsg() {
    const { bckColor, btnBackColor, btnTextColor } = this.state;
    const openChat = () => {
      this.props.existingChatRoom !== undefined
        ? this.props.openChatView()
        : this.props.onChatRequest();
    };

    if (!this.props.myprofile) {
      return (
        <View style={{ backgroundColor: bckColor }}>
          <View style={styles.ButtonOption}>
            <TouchableOpacity
              onPress={openChat}
              style={[styles.buttonStyle, { backgroundColor: btnBackColor }]}
            >
              <Text style={[styles.textButtonStyle, { color: btnTextColor }]}>
                Send Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  renderTags(tags) {
    const { tabIndex } = this.state;
    return (
      <View style={{ paddingTop: paddings.XXS }}>
        {tags.length > 0 ? (
          <View style={styles.tagList}>
            {tags.map(tag => <Tag key={tag.id} data={tag} dark={!tabIndex} />)}
          </View>
        ) : (
          <Text
            style={[
              styles.tagCategoriesLove,
              { paddingTop: paddings.XS, paddingBottom: paddings.SM },
            ]}
          >
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.LIGHT_GREY,
          paddingBottom: paddings.LG,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 20,
            paddingTop: paddings.XS,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              borderBottomColor: this.state.yeahsTextColor,
              borderBottomWidth: this.state.tabIndex ? 4 : 0,
              paddingBottom: paddings.XXS,
              paddingTop: paddings.XS,
              marginHorizontal: paddings.LG,
            }}
            onPress={() => {
              if (!this.state.tabIndex) {
                this.onChangeTab();
              }
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.TITLE,
                fontSize: fontSizes.HEADING_3,
                letterSpacing: 3.2,
                color: this.state.yeahsTextColor,
              }}
            >
              YEAHS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              borderBottomColor: this.state.nahsTextColor,
              borderBottomWidth: !this.state.tabIndex ? 4 : 0,
              marginHorizontal: 15,
              paddingTop: paddings.XS,
              paddingBottom: paddings.XXS,
              marginHorizontal: 30,
            }}
            onPress={() => {
              if (this.state.tabIndex) {
                this.onChangeTab();
              }
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Friendship_version_2',
                fontSize: fontSizes.HEADING_3,
                letterSpacing: 3.2,
                color: this.state.nahsTextColor,
              }}
            >
              NAHS
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderTags(tags)}
        {this.renderSendMsg()}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tagList: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 22,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textButtonStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'NunitoSans-Bold',
  },
  tagCategoriesLove: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: colors.DARK_BLACK,
    fontSize: 13,
  },
  tagCategoriesHate: {
    alignSelf: 'center',
    flexGrow: 1,
    textAlign: 'center',
    color: colors.DARK_BLACK,
    fontSize: 13,
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 241,
    height: 47,
    borderRadius: 34,
  },
  tabLabel: {
    fontFamily: 'Friendship_version_2',
    fontSize: 30,
    letterSpacing: 3,
  },
  ButtonOption: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
});
