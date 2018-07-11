import {Dimensions, StyleSheet} from 'react-native';
import { colors, paddings } from '../../styles';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  footer: { position: 'absolute', bottom: 0, width },
  secondaryFooter: {
    alignSelf: 'flex-end',
  },
  footerWave: {
    resizeMode: 'stretch',
    alignSelf: 'flex-end',
    width
  },
  footerContent: {
    backgroundColor: colors.ORANGE,
    flexDirection: 'row',
    paddingBottom: paddings.SM,
    paddingTop: paddings.XS,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
