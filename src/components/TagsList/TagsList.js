import React from 'react';
import {Text, View} from "react-native";
import {connect} from "react-redux";
import {ActionTypes, fetchTags} from "../../actions/tags";
import styles from "./styles";
import Tag, {Actions} from "../TagPicker";
import {Field} from "redux-form";

const mapStateToProps = state => ({
  activities: state.tags.activitiesList,
  interests: state.tags.interestsList,
  lovedTags: state.form.register.values.lovedTags,
  hatedTags: state.form.register.values.hatedTags,
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
        <Text style={[styles.title]}>Activities</Text>
        {this.renderTags(activities)}
        <Text style={[styles.title]}>Interests</Text>
        {this.renderTags(interests, true)}
      </View>
    )
  }

  renderTags(list, endOfList = false) {
    if (list.length > 0) {
      const listEnd = endOfList ? list[list.length - 1].id : -1;
      return list.map(item => (
        <Field name={'tags'} component={Tag} tag={item} isLastTag={listEnd === item.id} key={item.name}
               onPress={(tag, category, actionType) => this.handlePressedTag(tag, category, actionType)}/>));
    }
  }

  handlePressedTag(tag, category, actionType) {
    const {lovedTags, hatedTags, onChange} = this.props;
    const tagsArrays = [
      {
        list: lovedTags,
        arrayName: 'lovedTags'
      },
      {
        list: hatedTags,
        arrayName: 'hatedTags'
      }
    ];
    let arrayIndex = 0;
    let nextSelectedTags;
    let changedCategory;
    let tagPos = -1;

    if (actionType === Actions.RESET_TAG_CHOICE) {
      while (arrayIndex < tagsArrays.length && tagPos < 0) {
        tagPos = tagsArrays[arrayIndex].list.indexOf(tag);
        arrayIndex++;
      }
      nextSelectedTags = [...tagsArrays[arrayIndex - 1].list];
      changedCategory = tagsArrays[arrayIndex - 1].arrayName;
      nextSelectedTags.splice(tagPos, 1);
    } else {
      if (actionType === Actions.YEAHS_TAG) {
        changedCategory = tagsArrays[0].arrayName;
        nextSelectedTags = [...lovedTags];
      } else {
        changedCategory = tagsArrays[1].arrayName;
        nextSelectedTags = [...hatedTags];
      }
      nextSelectedTags.push(tag);
    }
    onChange(changedCategory, nextSelectedTags);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsList)