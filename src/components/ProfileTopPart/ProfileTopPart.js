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
import { getFormattedAge } from '../../utils/ageFormatter';

const ProfileTopPart = props => {
  const {
    birthyear,
    mood,
    location,
    numberOfNaah,
    numberOfYeah,
    srcImage,
    username,
    myProfile,
    genderList,
    commonTagPercent,
  } = props;

  const getGenders = () => {
    return genderList
      ? genderList.map(gender => gender && gender.toLowerCase()).join(' and ')
      : 'no gender';
  };

  const getYeahAndNaahs = () => {
    if (myProfile) {
      return (
        <View style={[styles.info]}>
          <Text
            style={{
              fontFamily: fonts.REGULAR,
              fontSize: fontSizes.BODY_TEXT,
              color: colors.DARK_BLACK,
              textAlign: 'center',
            }}
          >
            You have <Text style={[styles.yeahText]}>{numberOfYeah}</Text>
            <Text style={[styles.friendshipFont, styles.yeahText]}>
              {' '}
              YEAHS{' '}
            </Text>
            &<Text style={[styles.nahText]}>{' ' + numberOfNaah}</Text>
            <Text style={[styles.friendshipFont, styles.nahText]}> NAAHS </Text>
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.info]}>
        <Text
          style={{
            fontFamily: fonts.REGULAR,
            fontSize: fontSizes.BODY_TEXT,
            color: colors.DARK_BLACK,
            textAlign: 'center',
          }}
        >
          {`${commonTagPercent}% `}
          <Text style={[styles.friendshipFont, styles.yeahText]}>YEAHS </Text>&
          <Text style={[styles.friendshipFont, styles.nahText]}> NAAHS </Text>
          in common
        </Text>
      </View>
    );
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
          source={{ uri: mood }}
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
        {getYeahAndNaahs()}
        <View style={[styles.info]}>
          <Text style={[styles.details]}>
            <Text style={[styles.locationText]}>
              {location ? location : 'Narnia'}
            </Text>
            {', ' + getFormattedAge(birthyear)}
            {getGenders()}
          </Text>
        </View>
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
