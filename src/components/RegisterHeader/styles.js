import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontSizes, paddings} from "../../styles";

export default StyleSheet.create({
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Friendship_version_2',
    fontSize: fontSizes.HEADING_2,
    textAlign: 'justify',
    marginHorizontal: paddings.LG,
    paddingVertical: paddings.MD,
    lineHeight: 35,
  }
})