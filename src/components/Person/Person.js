import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, fontSizes, paddings } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { disableTouchableOpacity } from '../../actions/TouchableOpacityController';
import styles from './styles';
import { fetchUserInformation } from '../../actions/users';
import { fetchUserTags } from '../../actions/tags';
import { fetchUserPersonalities } from '../../actions/personalities';
import { fetchUserChatroom } from '../../actions/chatrooms';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  openProfile: personId => {
    dispatch(fetchUserInformation(personId));
    dispatch(fetchUserTags(personId));
    dispatch(fetchUserPersonalities(personId));
    dispatch(fetchUserChatroom(personId));
    return dispatch(
      NavigationActions.navigate({
        routeName: 'PeopleProfile',
        params: { personId },
      }),
    );
  },
});

class Person extends React.Component {
  state = {
    age: '',
    genders: '',
    locations: '',
    disable: false,
  };

  componentDidMount() {
    if (this.props.data.username) {
      this.getGenders();
      this.getAge();
      this.getLocations();
    }
  }

  getGenders = () => {
    const genders = this.props.data.genders
      ? this.props.data.genders.map(x => x && x.toLowerCase()).join(', ')
      : '';
    this.setState({ genders });
  };

  getAge = () => {
    const birthYear = parseInt(this.props.data.birthyear);
    const now = new Date();
    let age = now.getFullYear() - birthYear;

    let ageName = '';
    const lastDigit = age.toString().substr(age.toString().length - 1);
    if (age && age < 20) {
      ageName = age + ', ';
    } else if (age) {
      ageName = age - parseInt(lastDigit) + 's, ';
    } else {
      ageName = '';
    }
    this.setState({ age: ageName });
  };

  getLocations = () => {
    const locations = this.props.data.locations
      ? this.props.data.locations.join(',')
      : 'Narnia';
    this.setState({ locations });
  };

  renderBox = () => {
    return (
      <TouchableOpacity
        style={[
          styles.mainView,
          { marginLeft: this.props.index === 0 ? paddings.SM : 0 },
        ]}
        disabled={this.state.disabled}
        onPress={() => {
          disableTouchableOpacity(this);
          this.props.openProfile(this.props.data.id);
        }}
      >
        <View style={styles.topPart}>
          <Image
            style={styles.peoplePicture}
            source={{ uri: this.props.data.image }}
          />
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              position: 'absolute',
              padding: paddings.XS,
              bottom: 0,
              left: 0,
              alignItems: 'flex-end',
              flexDirection: 'row',
            }}
          >
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Icon
                name="md-pin"
                size={14}
                color={colors.DUST_WHITE}
                style={{ marginRight: paddings.XS }}
              />
              <Text style={[styles.locationText]}>{this.state.locations}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Image
                source={{ uri: this.props.data.avatar }}
                style={styles.whiteCircle}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomPart}>
          <View style={styles.viewBottom}>
            <Text numberOfLines={1} style={styles.textName}>
              {this.props.data.username}
            </Text>
            <Text style={styles.textDetails}>
              {this.state.age}
              {this.state.genders}
            </Text>
            <Text style={[styles.compatibilityText]}>
              {`${this.props.data.commonTagPercent}% `}
              <Text style={[styles.yeahText, styles.friendshipFont]}>
                YEAHS
              </Text>{' '}
              &{' '}
              <Text style={[styles.nahText, styles.friendshipFont, styles.nah]}>
                NAAHS
              </Text>{' '}
              in common
            </Text>
            <Text
              numberOfLines={Dimensions.get('window').width > 320 ? 7 : 4}
              style={{
                fontFamily: fonts.REGULAR,
                fontSize: fontSizes.SMALL,
                color: colors.DARK_BLACK,
              }}
            >
              {this.props.data.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderLine = () => (
    <View style={styles.listItem}>
      <View>
        <Image
          source={{ uri: this.props.data.avatar }}
          style={styles.listEmoji}
        />
      </View>

      <TouchableOpacity
        style={styles.nameView}
        disabled={this.state.disabled}
        onPress={() => {
          disableTouchableOpacity(this);
          this.props.openProfile(this.props.data.userId);
        }}
      >
        <Text style={styles.listName}>{this.props.data.username}</Text>
      </TouchableOpacity>
    </View>
  );

  render = () => (this.props.box ? this.renderBox() : this.renderLine());
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Person);
