import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import BubbleTextInput from '../../components/BubbleTextInput';
import { colors, fonts, paddings } from '../../styles';
import Footer from '../../components/Footer/Footer';
import { sendAppFeedback } from '../../actions/feedback';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  submitFeedback: payload => dispatch(sendAppFeedback(payload)),
});

class FeedbackScreen extends React.Component {
  state = {
    feedback: '',
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          padding: paddings.SM,
          paddingTop: Platform.OS === 'ios' ? paddings.SM : paddings.LG,
          marginTop: 64,
        }}
      >
        <ScrollView>
          <BubbleTextInput
            placeholder={'Write feedback here...'}
            onContentSizeChange={() => console.log('changing...')}
            onChangeText={text => this.setState({ feedback: text })}
          />
        </ScrollView>
        <Footer
          disabled={!this.state.feedback.length > 0}
          color="orange"
          onPress={() => this.props.submitFeedback(this.state.feedback)}
        >
          <Text style={{ fontFamily: fonts.LIGHT, color: colors.WHITE }}>
            Send feedback
          </Text>
        </Footer>
      </KeyboardAvoidingView>
    );
  }
}

FeedbackScreen.propTypes = {};

export default connect(
  null,
  mapDispatchToProps,
)(FeedbackScreen);
