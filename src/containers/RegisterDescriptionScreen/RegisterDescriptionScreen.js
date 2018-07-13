import React from 'react';
import {Dimensions, KeyboardAvoidingView, ScrollView, Text, View} from "react-native";
import RegisterHeader from "../../components/RegisterHeader";
import {MATCHING_AGREEMENT} from "../../components/ProgressSteps";
import styles from "./styles";
import BubbleTextInput from "../../components/BubbleTextInput";
import Footer from "../../components/Footer";
import {paddings} from "../../styles";

class DescriptionScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={[styles.descriptionScreen]} behavior="padding" enabled>
        <ScrollView contentContainerStyle={{flex: 1}} bounces={false} ref="scrollView">
          <RegisterHeader headerTitle={'FINDING THE RIGHT PEOPLE FOR YOU'} processStage={MATCHING_AGREEMENT}/>
          <View style={[styles.description]}>
            <Text style={[styles.title]}>WOULD YOU LIKE TO ADD A SMALL BIO?</Text>
            <BubbleTextInput
              placeholder={'ADD A DESCRIPTION \n \nYou can tell your future friends about your interests, what you’re looking for or what you think friendship is…'}
              onContentSizeChange={(evt) => this.refs.scrollView.scrollToEnd()}
            />
          </View>
        </ScrollView>
        <Footer color={'blue'}>
          <Text style={[styles.next]}>Next</Text>
        </Footer>
      </KeyboardAvoidingView>
    )
  }
}

export default DescriptionScreen;