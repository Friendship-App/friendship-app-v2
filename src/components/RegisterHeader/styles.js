import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes, paddings} from "../../styles";

export default StyleSheet.create({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    width: '100%',
    fontFamily: 'Friendship_version_2',
    fontSize: fontSizes.HEADING_2,
    textAlign: 'justify',
    color: colors.MEDIUM_BLACK,
    marginLeft: paddings.LG,
    paddingVertical: paddings.MD
  }
})