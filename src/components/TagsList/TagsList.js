import React from 'react';
import {Text, View} from "react-native";
import {connect} from "react-redux";
import {ActionTypes, fetchTags} from "../../actions/tags";
import styles from "./styles";
import Tag from "../Tag/";

const mapStateToProps = state => ({
  activities: state.tags.activitiesList,
  interests: state.tags.interestsList,
  register: state.form.register,
});

const mapDispatchToProps = dispatch => ({
  fetchActivities: () => dispatch(fetchTags()),
  fetchInterests: () => dispatch(fetchTags(ActionTypes.INTERESTS_REQUEST)),
});

class TagsList extends React.Component {
  componentWillMount() {
    this.props.fetchActivities();
    this.props.fetchInterests();
  }

  render() {
    const {activities, interests} = this.props;

    return (
      <View style={styles.tagsList}>
        <Text style={[styles.title, styles.yeah]}>Activities</Text>
        {this.renderTags(activities)}
        <Text style={[styles.title, styles.nah]}>Interests</Text>
        {this.renderTags(interests, true)}
      </View>
    )
  }

  renderTags(list, endOfList = false) {
    if (list.length > 0) {
      const listEnd = endOfList ? list[list.length - 1].id : -1;
      return list.map(item => (<Tag tag={item} isLastTag={listEnd === item.id} key={item.name}/>));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsList)