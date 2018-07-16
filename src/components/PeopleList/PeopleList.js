import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {fetchBatchUsers} from "../../actions/users";
import Person from "../Person";

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: batchSize => {
    dispatch(fetchBatchUsers(batchSize));
  },
});

class PeopleList extends Component {
  state = {
    userData: [],
    currentPage: 0,
  };

  componentWillMount() {
    this.fetchUsersForPage(this.state.currentPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setStateWithUsersData(nextProps);
  }

  setStateWithUsersData = nextProps => {
    if (!nextProps.users.isLoading) {
      this.setState({
        userData: [...this.state.userData, ...nextProps.users.usersList],
      });
    }
  };

  // fetch 10 users and add them to the state.data
  fetchUsersForPage = currentPage => {
    this.props.fetchUsers(currentPage);
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
    const { userData } = this.state;

    return (
      <View style={[styles.peopleList]}>
        <FlatList
          data={userData}
          keyExtractor={(item, index) => 'list-item-' + index}
          renderItem={({ item, index }) => (<Person box data={item} index={index}/>)}
          onEndReached={this.handleEnd}
          onEndReachedThreshold={0.4}
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

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
