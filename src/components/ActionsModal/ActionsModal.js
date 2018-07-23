import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../styles';
import { logOut } from '../../actions/login';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(logOut()),
});

class ActionsModal extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.props.close}
      >
        <View style={{ flex: 1, backgroundColor: colors.DARK_BLACK }}>
          <TouchableOpacity
            onPress={() => {
              this.props.signOut();
              this.props.close();
            }}
            style={{ paddingTop: 50 }}
          >
            <Text style={{ color: 'black' }}>Log out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

ActionsModal.propTypes = {};

export default connect(
  null,
  mapDispatchToProps,
)(ActionsModal);
