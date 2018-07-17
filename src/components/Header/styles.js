import { StyleSheet, Dimensions, Platform } from 'react-native';
import { paddings } from '../../styles';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 24;

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingTop: STATUSBAR_HEIGHT,
    position: 'absolute',
    top: 0,
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
