import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import waveShape from '../../../assets/img/curve/curve.png';
import { colors, fonts, fontSizes, paddings } from '../../styles';

const ProfileTopPart = props => {
  const {
    birthyear,
    avatar,
    location,
    numberOfNaah,
    numberOfYeah,
    srcImage,
    showModal,
    username,
    myProfile,
    genderList,
    showEditForm,
  } = props;

  const getAge = () => {
    const parsedBirthYear = parseInt(birthyear);
    const now = new Date();
    let age = now.getFullYear() - parsedBirthYear;

    const early = [0, 1, 2, 3];
    const mid = [4, 5, 6];
    const late = [7, 8, 9];
    let ageName = '';
    const lastDigit = age.toString().substr(age.toString().length - 1);
    if (age < 20) {
      ageName = age + ' years old';
    } else if (early.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'early ' + (age - parseInt(lastDigit)) + "'s";
    } else if (mid.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'mid ' + (age - parseInt(lastDigit)) + "'s";
    } else if (late.indexOf(parseInt(lastDigit)) > -1) {
      ageName = 'late ' + (age - parseInt(lastDigit)) + "'s";
    } else {
      ageName = "It's a mystery";
    }
    return ageName;
  };

  const getGenders = () => {
    return genderList
      ? genderList.map(gender => gender && gender.toLowerCase()).join(' and ')
      : 'no gender';
  };

  const renderActionButton = () => {
    if (myProfile) {
      return (
        <TouchableOpacity
          onPress={showModal}
          style={{
            backgroundColor: 'rgb(255, 138, 101)',
            height: 35,
            width: 35,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 2,
            paddingLeft: 2,
            marginRight: 10,
            alignSelf: 'flex-end',
          }}
        >
          <Icon name="md-settings" size={26} style={styles.backButton} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <Image style={styles.imageUser} source={{ uri: srcImage }} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          height: '100%',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        <Image
          source={{ uri: avatar }}
          style={{
            width: 64,
            height: 64,
            backgroundColor: 'transparent',
            marginRight: 15,
          }}
        />
        <Image
          source={waveShape}
          style={styles.waveShape}
          resizeMode="stretch"
        />
        <View style={[styles.info]}>
          <Text style={[styles.username]}>
            {username.length > 15
              ? username.substr(0, 15).concat('…')
              : username}
          </Text>
        </View>
        <View style={[styles.info]}>
          <Text
            style={{
              fontFamily: fonts.REGULAR,
              fontSize: fontSizes.BODY_TEXT,
              color: colors.DARK_BLACK,
              textAlign: 'center',
            }}
          >
            {myProfile ? 'You have ' : null}
            <Text style={[styles.yeahText]}>{numberOfYeah}</Text>
            <Text style={[styles.friendshipFont, styles.yeahText]}>
              {' '}
              YEAHS{' '}
            </Text>
            &
            <Text style={[styles.nahText]}>{' ' + numberOfNaah}</Text>
            <Text style={[styles.friendshipFont, styles.nahText]}> NAAHS </Text>
            {myProfile ? null : ' in common'}
          </Text>
        </View>
        <View style={[styles.info]}>
          <Text style={[styles.details]}>
            <Text style={[styles.locationText]}>
              {location ? location : 'Narnia'}
            </Text>
            {', ' + getAge() + ', '}
            {getGenders()}
          </Text>
        </View>
        {/*<View style={{ flex: 3, flexDirection: 'column', backgroundColor: 'pink' }}>
          <View style={styles.avatarCircle}>
            <Image
              source={{ uri: avatar }}
              style={{
                width: 64,
                height: 64,
                backgroundColor: 'transparent',
                marginRight: 15,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 2,
            }}
          >
            <Image
              source={waveShape}
              style={styles.waveShape}
              resizeMode="stretch"
            />
            <View style={{ flex: 3, backgroundColor: colors.DUST_WHITE }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: paddings.XXS,
                }}
              >
                <Text style={[styles.username]}>
                  {username.length > 15
                    ? username.substr(0, 15).concat('…')
                    : username}
                </Text>
                {myProfile ? (
                  <TouchableOpacity onPress={() => showEditForm()}>
                    <Image
                      source={require('../../../assets/edit.png')}
                      style={{ width: 38, height: 38, tintColor: '#000' }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  fontSize: fontSizes.BODY_TEXT,
                  color: colors.DARK_BLACK,
                  textAlign: 'center',
                }}
              >
                {myProfile ? 'You have ' : null}
                <Text style={[styles.yeahText]}>{numberOfYeah}</Text>
                <Text style={[styles.friendshipFont, styles.yeahText]}>
                  {' '}
                  YEAHS{' '}
                </Text>
                &
                <Text style={[styles.nahText]}>{' ' + numberOfNaah}</Text>
                <Text style={[styles.friendshipFont, styles.nahText]}>
                  {' '}
                  NAAHS{' '}
                </Text>
                {myProfile ? null : ' in common'}
              </Text>
              <Text style={[styles.details]}>
                <Text style={[styles.locationText]}>
                  {location ? location : 'Narnia'}
                </Text>
                {', ' + getAge() + ', '}
                {getGenders()}
              </Text>
            </View>
          </View>
        </View>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: paddings.XXS,
    backgroundColor: colors.DUST_WHITE,
  },
  locationText: {
    fontFamily: fonts.LIGHT_BOLD,
    fontSize: fontSizes.SMALL,
  },
  details: {
    fontFamily: fonts.REGULAR,
    fontSize: fontSizes.BODY_TEXT,
    textAlign: 'center',
    marginBottom: paddings.SM,
  },
  friendshipFont: {
    fontFamily: fonts.TITLE,
  },
  yeahText: {
    color: colors.DARK_BLUE,
    fontFamily: fonts.BOLD,
  },
  nahText: {
    color: colors.ORANGE,
    fontFamily: fonts.BOLD,
  },
  username: {
    fontFamily: fonts.REGULAR,
    fontSize: fontSizes.HEADING_4,
    textAlign: 'center',
    color: colors.DARK_BLACK,
  },
  avatarCircle: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    width: '100%',
  },
  avatar: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 30 : 40,
    paddingTop: 8,
  },
  waveShape: {
    height: 40,
    width: Dimensions.get('window').width,
    tintColor: '#F9F6F1',
  },
  imageUser: {
    width: Dimensions.get('window').width,
    height: 350,
  },
  backAndSettingsView: {
    marginTop: 10,
    flex: 2,
    flexDirection: 'column',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

export default ProfileTopPart;
