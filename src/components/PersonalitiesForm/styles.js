import {StyleSheet} from 'react-native';
import {colors, paddings, styles} from "../../styles";

export default StyleSheet.create({
  personalitiesForm: {
    ...styles.rootContainer,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.DARK_BLACK,
    // paddingBottom: paddings.FOOTER,
  },
})