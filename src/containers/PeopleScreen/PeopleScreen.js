import React from 'react';
import PeopleList from '../../components/PeopleList';
import BackButtonAndroid from '../../components/BackButtonAndroid';

const PeopleScreen = ({ navigation }) => (
  <BackButtonAndroid navigation={navigation}>
    <PeopleList />
  </BackButtonAndroid>
);

export default PeopleScreen;
