import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { colors, paddings } from '../../styles';
import WithNotificationIcon from '../WithNotificationIcon';
import { logOut } from '../../actions/login';
import { connect } from 'react-redux';
import styles from './styles';
import { fetchLocations } from '../../actions/locations';
import { fetchTags } from '../../actions/tags';
import { fetchPersonalities } from '../../actions/personalities';
import Button from '../Button/Button';

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
  openReportUser: () =>
    dispatch(NavigationActions.navigate({ routeName: 'ReportUser' })),
  openSendFeedback: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Feedback' })),
  getLocations: () => dispatch(fetchLocations()),
  getTags: () => dispatch(fetchTags()),
  getPersonalities: () => dispatch(fetchPersonalities()),
});

const getTitle = modalType => {
  switch (modalType) {
    default:
      return <Text style={[styles.header]}>SETTINGS</Text>;
  }
};

class ActionsModal extends Component {
  render() {
    const modalActions = {
      profile: [
        {
          title: 'PROFILE',
          hasNotification: false,
          onPress: async () => {
            await this.props.close();
            await this.props.getLocations();
            this.props.openEditProfile();
          },
        },
        {
          title: 'ACCOUNT',
          hasNotification: false,
          onPress: async () => {
            await this.props.close();
            this.props.openEditAccount();
          },
        },
        {
          title: 'YEAHS AND NAAAHS',
          hasNotification: true, // TODO
          onPress: async () => {
            await this.props.close();
            await this.props.getTags();
            this.props.openEditTags();
          },
        },
        {
          title: 'PERSONALITIES',
          hasNotification: false,
          onPress: async () => {
            await this.props.close();
            await this.props.getPersonalities();
            this.props.openEditPersonalities();
          },
        },
        {
          title: 'Log Out',
          hasNotification: false,
          onPress: () => {
            this.props.close();
            this.props.signOut();
          },
        },
      ],
      settings: [
        {
          title: 'REPORT',
          hasNotification: false,
          onPress: async () => {
            console.log('reporting...');
            await this.props.close();
            this.props.openReportUser();
          },
        },
      ],
    };

    const getActions = () => {
      const { actions } = this.props;
      let actionsArray = [];
      switch (actions) {
        case 'profile':
          actionsArray = modalActions.profile;
          break;
        default:
          actionsArray = modalActions.settings;
      }
      return actionsArray.map(action => (
        <WithNotificationIcon
          hasNotification={action.hasNotification}
          key={action.title}
        >
          <TouchableOpacity
            onPress={action.onPress}
            style={{
              paddingBottom: paddings.SM,
              paddingRight: action.hasNotification ? paddings.XXS : 0,
            }}
          >
            <Text style={[styles.action]}>{action.title.toUpperCase()}</Text>
          </TouchableOpacity>
        </WithNotificationIcon>
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
          <View
            style={{
              flex: 1,
              width: '100%',
              padding: paddings.SM,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button
              text={'Send feedback'}
              width={'xl'}
              onPress={async () => {
                await this.props.close();
                this.props.openSendFeedback();
              }}
            />
          </View>
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
