import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import styles from './styles';
import { colors, paddings } from '../../styles';
import BubbleTextInput from '../BubbleTextInput';
import { disableTouchableOpacity } from '../../actions/TouchableOpacityController';

class ReportForm extends Component {
  state = {
    text: '',
  };

  render() {
    const { reportType, handlePress } = this.props;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: colors.DUST_WHITE }}
      >
        <View style={[styles.container]}>
          <Text>
            Why do you want to report{' '}
            {reportType === 'user'
              ? this.props.data.username
              : this.props.data.title}
            ?
          </Text>
          <BubbleTextInput
            onContentSizeChange={evt => {}}
            onChangeText={evt => this.setState({ text: evt })}
            style={{ width: '90%', marginTop: 10 }}
          />
          <Footer color={'orange'}>
            <TouchableOpacity
              onPress={() => {
                disableTouchableOpacity(this);
                handlePress(this.state.text);
              }}
              disabled={!this.state.text.trim().length === 0}
            >
              <Text style={[styles.next]}>Report</Text>
            </TouchableOpacity>
          </Footer>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

ReportForm.propTypes = {};

export default ReportForm;
