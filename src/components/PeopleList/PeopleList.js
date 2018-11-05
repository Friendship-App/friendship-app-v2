import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { fetchBatchUsers } from '../../actions/users';
import { refresh } from '../../actions/refresh';
import Person from '../Person';

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: (batchSize, usersAlreadyFetched) => {
    dispatch(fetchBatchUsers(batchSize, usersAlreadyFetched));
  },

  refresh: () => {
    dispatch(refresh());
  },
});

class PeopleList extends Component {
  state = {
    userData: [],
    currentPage: 1,
  };

  // fetch 10 users and add them to the state.data
  fetchUsersForPage = currentPage => {
    this.props.fetchUsers(currentPage, this.state.userData);
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  //this variable prevent handleEnd() to be called during the first render (know RN bug)
  onEndReachedCalledDuringMomentum = true;

  handleEnd = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      // fetch 10 more users from the db
      this.fetchUsersForPage(this.state.currentPage);
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  render() {
    const userData = this.props.users.usersList;

    return (
      <View style={[styles.peopleList]}>
        <FlatList
          data={userData}
          keyExtractor={(item, index) => 'list-item-' + index}
          renderItem={({ item, index }) => (
            <Person box data={item} index={index} />
          )}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={0.4}
          refreshing={false}
          onRefresh={this.props.refresh}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          horizontal
          style={[styles.list]}
        />
      </View>
      /*<View style={[styles.people]}>

      </View>*/
    );
  }
}

PeopleList.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleList);
