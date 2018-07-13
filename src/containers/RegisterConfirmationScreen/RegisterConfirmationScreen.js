import React from 'react';
import {Text, View} from "react-native";
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from "../../styles";
import Footer from "../../components/Footer";
import styles from "./styles";
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => ({
  openApp: () => dispatch(NavigationActions.navigate({routeName: 'Home'}))
});

const RegisterConfirmationScreen = props => (
  <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colors.DARK_BLACK}}>
    <Icon
      name="md-checkmark-circle"
      size={60}
      color="green"
      style={[styles.icon]}
    />
    <Text style={[styles.message]}>
      Thank you for registering !
    </Text>
    <Footer onPress={() => props.openApp()}>
      <Text style={[styles.next]}>YAY</Text>
    </Footer>
  </View>
);

export default connect(null, mapDispatchToProps)(RegisterConfirmationScreen);