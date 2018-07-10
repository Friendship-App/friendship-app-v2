import React from 'react';
import {ActivityIndicator, View} from "react-native";
import styles from "./styles";

const Loading = props => (
  <View style={[styles.loading]}>
    <ActivityIndicator size='large'/>
  </View>
);

export default Loading;