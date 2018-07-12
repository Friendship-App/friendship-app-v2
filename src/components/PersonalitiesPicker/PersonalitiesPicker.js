import React from 'react';
import {Text, View, Dimensions} from "react-native";
import {colors, fontSizes, paddings} from "../../styles";
import Personality from "../Personality";

const PersonalitiesPicker = props => (
  <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 1, paddingVertical: Dimensions.get('window').height > 568 ? paddings.XXL : 0}}>
    <Personality
      personality={props.personalities[0].name}
      onPress={() => props.onPress(props.personalities[0].id)}
    />
    <Text style={{fontSize: fontSizes.BODY_TEXT, color: colors.DUST_WHITE}}>or</Text>
    <Personality
      personality={props.personalities[1].name}
      onPress={() => props.onPress(props.personalities[1].id)}
    />
  </View>
);

export default PersonalitiesPicker;