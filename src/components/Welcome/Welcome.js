import React from 'react';
import {View} from "react-native";
import WelcomeMessage from "../WelcomeMessage";
import styles from './styles';
import Footer from "../Footer";
import Button from "../Button";

const Welcome = props => (
  <View style={[styles.welcome]}>
    <WelcomeMessage/>
    <Footer>
      <Button text="Join" width="md" onPress={props.handleRegister} />
      <Button
        text="Log In"
        type="secondary"
        width="md"
        onPress={props.login}
        color="white"
      />
    </Footer>
  </View>
);

export default Welcome;