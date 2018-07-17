import { Dimensions, Platform, StyleSheet } from 'react-native';
import { headerPalette, paddings } from '../../styles';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 24;

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingTop: STATUSBAR_HEIGHT,
    position: 'absolute',
    top: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: headerPalette.colors.HEADER_BORDER_BOTTOM,
  },
  header: {
    height: APPBAR_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: paddings.SM,
  },
});
