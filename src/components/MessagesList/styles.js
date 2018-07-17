import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export default StyleSheet.create({
  messagesList: {
    flex: 1,
    backgroundColor: colors.DUST_WHITE,
  },
  Card: {
    marginVertical: 10,
  },
  SendCard: {
    flex: 1,
    padding: 10,
    marginLeft: 60,
    backgroundColor: colors.ORANGE,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignSelf: 'flex-end',
  },
  ReceiveCard: {
    flex: 1,
    padding: 10,
    marginRight: 60,
    backgroundColor: colors.MEDIUM_GREY,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignSelf: 'flex-start',
  },
});
