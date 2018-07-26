import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { colors, paddings } from '../../styles';
import { logOut } from '../../actions/login';
import { connect } from 'react-redux';
import styles from './styles';
import { fetchLocations } from '../../actions/locations';
import { fetchTags } from '../../actions/tags';
import { fetchPersonalities } from '../../actions/personalities';

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(logOut()),
  openEditProfile: () =>
    dispatch(NavigationActions.navigate({ routeName: 'EditProfile' })),
  openEditTags: () =>
    dispatch(NavigationActions.navigate({ routeName: 'EditTags' })),
  openEditPersonalities: () =>
    dispatch(NavigationActions.navigate({ routeName: 'EditPersonalities' })),
  openEditAccount: () =>
    dispatch(NavigationActions.navigate({ routeName: 'EditAccount' })),
  getLocations: () => dispatch(fetchLocations()),
  getTags: () => dispatch(fetchTags()),
  getPersonalities: () => dispatch(fetchPersonalities()),
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
        title: 'PROFILE',
        onPress: async () => {
          await this.props.close();
          await this.props.getLocations();
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
        title: 'LOVE AND HATE',
        onPress: async () => {
          await this.props.close();
          await this.props.getTags();
          this.props.openEditTags();
        },
      },
      {
        title: 'PERSONALITIES',
        onPress: async () => {
          await this.props.close();
          await this.props.getPersonalities();
          this.props.openEditPersonalities();
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
