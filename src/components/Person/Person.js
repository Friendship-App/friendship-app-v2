import React from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {colors, fonts, fontSizes, paddings} from "../../styles";
import Icon from "react-native-vector-icons/Ionicons";
import {disableTouchableOpacity} from "../../actions/TouchableOpacityController";

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  openProfile: (personId, personName) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProfileUser',
        params: {personId, personName},
      }),
    ),
});

class Person extends React.Component {
  state = {
    age: '',
    genders: '',
    locations: '',
    shortUser: '',
    disable: false,
  };

  componentDidMount() {
    if (this.props.data.username) {
      this.getGenders();
      this.getAge();
      this.getLocations();
      this.cutNames();
    }
  }

  getGenders = () => {
    const genders = this.props.data.genders
      ? this.props.data.genders.map(x => x && x.toLowerCase()).join(', ')
      : '';
    this.setState({genders});
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
    this.setState({age: ageName});
  };

  getLocations = () => {
    const locations = this.props.data.locations
      ? this.props.data.locations.join(',')
      : 'Narnia';
    this.setState({locations});
  };

  cutNames = () => {
    /*const shortUser =
      this.props.data.username.length > 8
        ? `${this.props.data.username.substring(0, 8)}...`
        : this.props.data.username;*/
    this.setState({shortUser: this.props.data.username});
  };

  renderBox = () => {
    return (
      <TouchableOpacity
        style={[styles.mainView, {marginLeft: this.props.index === 0 ? paddings.SM : 0}]}
        disabled={this.state.disabled}
        onPress={() => {
          disableTouchableOpacity(this);
          this.props.openProfile(this.props.data.id, this.props.data.username);
        }}
      >
        <View style={styles.topPart}>
          <Image
            style={styles.peoplePicture}
            source={{uri: this.props.data.image}}
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
              flexDirection: 'row'
            }}
          >
            <View style={{flexDirection: 'row', flex: 1}}>
              <Icon name="md-pin" size={14} color={colors.DUST_WHITE} style={{marginRight: paddings.XS}}/>
              <Text style={[styles.locationText]}>
                {this.state.locations}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                source={{uri: this.props.data.avatar}}
                style={styles.whiteCircle}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomPart}>
          <View style={styles.viewBottom}>
            <Text numberOfLines={1} style={styles.textName}>{this.state.shortUser}</Text>
            <Text style={styles.textDetails}>
              {this.state.age}
              {this.state.genders}
            </Text>
            <Text style={[styles.compatibilityText]}>
              <Text style={[styles.yeahText]}>
                {this.props.data.lovecommon ? this.props.data.lovecommon : 0}
                <Text style={[styles.friendshipFont]}> YEAH</Text>
              </Text>{' '}
              &{' '}
              <Text style={[styles.nahText]}>
                {this.props.data.hatecommon ? this.props.data.hatecommon : 0}
                <Text style={[styles.friendshipFont, styles.nah]}> NAAH</Text>
              </Text>
              {' '} in common
            </Text>
            <Text numberOfLines={4}
                  style={{fontFamily: fonts.REGULAR, fontSize: fontSizes.SMALL, color: colors.DARK_BLACK}}>
              {this.props.data.description}
            </Text>
          </View>
        </View>
        {/*<View style={styles.topPart}>
          <Image
            style={styles.peoplePicture}
            source={{ uri: this.props.data.image }}
          />
          <View
            style={{
              height: '70%',
              width: '100%',
              backgroundColor: 'rgba(96, 104, 109, 0.55)',
              position: 'absolute',
              bottom: 0,
              left: 0,
              justifyContent: 'center',
            }}
          >
            <BoldDescription style={styles.topText}>
              {this.props.data.description}
            </BoldDescription>
            <LocationText style={{ textAlign: 'center', paddingTop: 20 }}>
              {this.state.locations}
            </LocationText>
          </View>
        </View>
        <FlexRow style={styles.bottomPart}>
          <Image
            source={{ uri: this.props.data.avatar }}
            style={styles.whiteCircle}
          />
          <View style={styles.viewBottom}>
            <Text style={styles.textName}>{this.state.shortUser}</Text>
            <Text style={styles.textDetails}>
              {this.state.age}
              {this.state.genders}
            </Text>
            <CompatibilityText style={{ marginBottom: 0, marginTop: 3 }}>
              <YeahColor>
                {this.props.data.lovecommon ? this.props.data.lovecommon : 0}
                <FrienshipFont> YEAH</FrienshipFont>
              </YeahColor>{' '}
              &{' '}
              <NaahColor>
                {this.props.data.hatecommon ? this.props.data.hatecommon : 0}
                <FrienshipFont> NAAH</FrienshipFont>
              </NaahColor>{' '}
            </CompatibilityText>
            <Text
              style={{
                flexWrap: 'wrap',
                fontSize: 12,
                color: '#4a4a4a',
                marginTop: -3,
              }}
            >
              in common
            </Text>
          </View>
        </FlexRow>*/}
      </TouchableOpacity>
    );
  };

  renderLine = () => (
    <View style={styles.listItem}>
      <View>
        <Image
          source={{uri: this.props.data.avatar}}
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

const styles = StyleSheet.create({
  locationText: {
    textAlign: 'left',
    color: colors.DUST_WHITE,
    fontFamily: fonts.BOLD,
    fontSize: fontSizes.SMALL
  },
  yeahText: {
    color: colors.DARK_BLUE,
    fontFamily: fonts.BOLD,
  },
  nahText: {
    color: colors.ORANGE,
    fontFamily: fonts.BOLD,
  },
  nah: {color: colors.ORANGE},
  friendshipFont: {
    fontFamily: fonts.TITLE,
  },
  compatibilityText: {
    marginBottom: paddings.XS,
    fontFamily: fonts.REGULAR,
    fontSize: fontSizes.SMALL,
    color: colors.DARK_BLACK,
  },
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: paddings.SM
  },
  peoplePicture: {
    flex: 1,
  },
  viewBottom: {
    flex: 1,
    flexDirection: 'column'
  },
  flexRow: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textName: {
    color: colors.DARK_BLACK,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 24,
  },
  textDetails: {
    color: colors.DARK_BLACK,
    fontSize: fontSizes.SMALL,
    marginTop: paddings.XXS
  },
  topPart: {
    flex: 6,
    justifyContent: 'flex-end',
    width: 260,
    borderRadius: 3,
  },
  topText: {
    color: 'white',
    maxHeight: 140,
    marginTop: 23,
    marginHorizontal: 20,
  },

  bottomPart: {
    width: 260,
    flex: 5,
    padding: paddings.SM,
    backgroundColor: colors.DUST_WHITE,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  whiteCircle: {
    width: 50,
    height: 50,
  },
  avatar: {
    backgroundColor: 'transparent',
    marginTop: 7,
    fontSize: Platform.OS === 'android' ? 35 : 45,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0,
    height: 70,
    backgroundColor: '#efebe9',
    width: Dimensions.get('window').width - 50,
    marginBottom: 5,
  },
  listName: {
    justifyContent: 'flex-start',
    fontSize: 20,
    fontWeight: '400',
  },
  listEmoji: {
    margin: 5,
    marginHorizontal: 10,
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
