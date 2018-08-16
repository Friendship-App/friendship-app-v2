import { Dimensions, StyleSheet } from 'react-native';
import { colors, fontSizes, paddings } from '../../styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    paddingVertical: Dimensions.get('window').height > 568 ? paddings.XXL : 0,
  },
  containerLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: paddings.SM,
  },
  edit: {},
  register: { fontSize: fontSizes.BODY_TEXT, color: colors.DUST_WHITE },
});
