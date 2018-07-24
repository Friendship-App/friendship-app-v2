import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { colors, paddings } from '../../styles';
import { logOut } from '../../actions/login';
import { connect } from 'react-redux';
import styles from './styles';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(logOut()),
  openEditProfile: () =>
    dispatch(NavigationActions.navigate({ routeName: 'EditProfile' })),
  openEditMatchingInfo: () => console.log('open edit personalities'),
  openEditAccount: () =>
    dispatch(NavigationActions.navigate({ routeName: 'EditAccount' })),
});

const getTitle = modalType => {
  switch (modalType) {
    case 'profile':
      return <Text style={[styles.header]}>SETTINGS</Text>;
  }
};

class ActionsModal extends Component {
  render() {
    const profileActions = [
      {
        title: 'MATCHING INFO',
        onPress: async () => {
          await this.props.close();
          this.props.openEditMatchingInfo();
        },
      },
      {
        title: 'PROFILE',
        onPress: async () => {
          await this.props.close();
          this.props.openEditProfile();
        },
      },
      {
        title: 'ACCOUNT',
        onPress: async () => {
          await this.props.close();
          this.props.openEditAccount();
        },
      },
      {
        title: 'Log Out',
        onPress: () => {
          this.props.close();
          this.props.signOut();
        },
      },
    ];

    const getActions = () => {
      const { actions } = this.props;
      let actionsArray = [];
      switch (actions) {
        case 'profile':
          actionsArray = profileActions;
      }
      return actionsArray.map(action => (
        <TouchableOpacity
          onPress={action.onPress}
          style={{ paddingBottom: paddings.SM }}
          key={action.title}
        >
          <Text style={[styles.action]}>{action.title.toUpperCase()}</Text>
        </TouchableOpacity>
      ));
    };

    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.props.close}
      >
        <TouchableOpacity
          activeOpacity={0.96}
          style={{
            flex: 1,
            backgroundColor: colors.DARK_BLACK,
            opacity: 0.96,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: paddings.MD,
          }}
          onPress={this.props.close}
        >
          {getTitle(this.props.actions)}
          {getActions()}
        </TouchableOpacity>
      </Modal>
    );
  }
}

ActionsModal.propTypes = {};

export default connect(
  null,
  mapDispatchToProps,
)(ActionsModal);
