import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import styles from './styles';
import BubbleTextInput from '../BubbleTextInput';

class ReportForm extends Component {
  state = {
    text: '',
  };

  render() {
    const { reportType, handlePress } = this.props;

    return (
      <View style={[styles.container]}>
        <Text>
          Why do you want to report{' '}
          {reportType === 'user'
            ? this.props.data.username
            : this.props.data.title}?
        </Text>
        <BubbleTextInput
          onContentSizeChange={evt => {}}
          onChangeText={evt => this.setState({ text: evt })}
          style={{ width: '90%', marginTop: 10 }}
        />
        <Footer
          color={'orange'}
          disabled={this.state.text.length === 0}
          onPress={() => handlePress(this.state.text)}
        >
          <Text style={[styles.next]}>Report</Text>
        </Footer>
      </View>
    );
  }
}

ReportForm.propTypes = {};

export default ReportForm;
