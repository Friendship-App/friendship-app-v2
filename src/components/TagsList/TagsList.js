import React from 'react';
import {Text, View} from "react-native";
import {connect} from "react-redux";
import {ActionTypes, fetchTags} from "../../actions/tags";
import styles from "./styles";
import Tag, {Actions} from "../Tag";
import {Field} from "redux-form";

const mapStateToProps = state => ({
  activities: state.tags.activitiesList,
  interests: state.tags.interestsList,
  lovedActivities: state.form.register.values.lovedActivities,
  hatedActivities: state.form.register.values.hatedActivities,
  lovedInterests: state.form.register.values.lovedInterests,
  hatedInterests: state.form.register.values.hatedInterests,
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
    const {lovedActivities, hatedActivities, lovedInterests, hatedInterests, onChange} = this.props;
    const arrays = [
      {
        list: lovedActivities,
        arrayName: 'lovedActivities'
      },
      {
        list: hatedActivities,
        arrayName: 'hatedActivities'
      },
      {
        list: lovedInterests,
        arrayName: 'lovedInterests'
      },
      {
        list: hatedInterests,
        arrayName: 'hatedInterests'
      }
    ];
    let arrayIndex = 0;
    let nextSelectedTagsForCategory;
    let changedCategory;
    let tagPos = -1;

    if (actionType === Actions.RESET_TAG_CHOICE) {
      while (arrayIndex < arrays.length && tagPos < 0) {
        tagPos = arrays[arrayIndex].list.indexOf(tag);
        arrayIndex++;
      }
      nextSelectedTagsForCategory = [...arrays[arrayIndex-1].list];
      changedCategory = arrays[arrayIndex-1].arrayName;
      nextSelectedTagsForCategory.splice(tagPos, 1);
    } else {
      if (category === 1) {
        if (actionType === Actions.YEAHS_TAG) {
          changedCategory = 'lovedActivities';
          nextSelectedTagsForCategory = [...lovedActivities];
        } else {
          changedCategory = 'hatedActivities';
          nextSelectedTagsForCategory = [...hatedActivities];
        }
      } else {
        if (actionType === Actions.YEAHS_TAG) {
          changedCategory = 'lovedInterests';
          nextSelectedTagsForCategory = [...lovedInterests];
        } else {
          changedCategory = 'hatedInterests';
          nextSelectedTagsForCategory = [...hatedInterests];
        }
      }
      nextSelectedTagsForCategory.push(tag);
    }
    onChange(changedCategory, nextSelectedTagsForCategory);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsList)