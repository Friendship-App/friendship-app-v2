import { StyleSheet } from 'react-native';
import {colors, paddings} from '../../styles';

export default StyleSheet.create({
  peopleList: {
    flex: 1,
    backgroundColor: colors.MEDIUM_GREY,
    paddingVertical: paddings.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    maxHeight: 600
  },
});
