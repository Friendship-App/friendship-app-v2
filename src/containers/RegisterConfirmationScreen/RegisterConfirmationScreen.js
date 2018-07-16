import React from 'react';
import {Text, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from "../../styles";
import Footer from "../../components/Footer";
import styles from "./styles";
import {connect} from "react-redux";
import {login} from "../../actions/login";

const mapStateToProps = state => ({
  register: state.form.register
});

const mapDispatchToProps = dispatch => ({
  openApp: (email, password) => dispatch(login(email, password))
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
    <Footer onPress={() => props.openApp(props.register.values.email, props.register.values.password)}>
      <Text style={[styles.next]}>YAY</Text>
    </Footer>
  </View>
);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterConfirmationScreen);