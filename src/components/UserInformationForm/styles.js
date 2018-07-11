import {StyleSheet} from 'react-native';
import {colors, styles} from "../../styles";

export default StyleSheet.create({
  userInformationForm: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.MEDIUM_GREY
  },
})