import React from 'react';
import {TextInput, View} from "react-native";
import {Field} from "redux-form";
import styles from './styles';

const RegisterTextInput = ({name, returnKeyType, placeholder, onChangeText, navigate, reference, secureTextEntry = false}) => (
  <View style={styles.textInput}>
    <Field
      withRef
      secureTextEntry={secureTextEntry}
      name={name}
      component={TextInput}
      autoCorrect={false}
      returnKeyType={returnKeyType}
      underlineColorAndroid="transparent"
      placeholderTextColor="#4a4a4a"
      placeholder={placeholder}
      onChangeText={onChangeText}
      onSubmitEditing={navigate}
      ref={reference}
      style={styles.field}
    />
  </View>
);

export default RegisterTextInput;