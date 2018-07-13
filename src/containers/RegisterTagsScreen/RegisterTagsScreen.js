import React from 'react';
import {ScrollView, Text, View} from "react-native";
import RegisterHeader from "../../components/RegisterHeader";
import {INTERESTS} from "../../components/ProgressSteps";
import styles from "./styles";
import Footer from "../../components/Footer";
import TagsList from "../../components/TagsList";

const TagsScreen = props => (
  <View style={styles.tagsScreen}>
    <ScrollView bounces={false}>
      <RegisterHeader backgroundStyle={'dark'} headerTitle={'YEAH! & NAAH...'} processStage={INTERESTS}/>
      <TagsList/>
    </ScrollView>
    <Footer onPress={() => console.log('pressed')} color={'grey'}>
      <Text>Next</Text>
    </Footer>
  </View>
);

export default TagsScreen;