import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { ActionTypes, fetchTags } from '../../actions/tags';
import styles from './styles';
import Tag, { Actions } from '../TagPicker';
import { Field } from 'redux-form';

const mapStateToProps = state => ({
  tagsList: state.tags.tagsList,
  lovedTags: state.form.register.values.lovedTags,
  hatedTags: state.form.register.values.hatedTags,
});

const mapDispatchToProps = dispatch => ({
  getTags: () => dispatch(fetchTags()),
});

class TagsList extends React.Component {
  componentWillMount() {
    this.props.getTags();
  }

  render() {
    const { tags } = this.props;

    return (
      <View style={styles.tagsList}>
        {this.renderAlternatingTags()}
        {this.renderBaseTags()}
      </View>
    );
  }

  renderAlternatingTags = () => {
    const { tagsList } = this.props;
    const alternatingTags = filter(
      tagsList,
      ({ type }) => type === 'alternating',
    );
    const tags = this.renderTags(alternatingTags);

    return (
      <View>
        <Text style={styles.tagTitle}>Alternating</Text>
        {tags}
      </View>
    );
  };

  renderBaseTags = () => {
    const { tagsList } = this.props;
    const baseTags = filter(tagsList, ({ type }) => type === 'base');
    const addMarginToLastTag = true;
    const tags = this.renderTags(baseTags, addMarginToLastTag);

    return (
      <View>
        <Text style={styles.tagTitle}>Base</Text>
        {tags}
      </View>
    );
  };

  renderTags(tagsList, addMarginToLastTag) {
    if (tagsList.length > 0) {
      const listEnd = tagsList[tagsList.length - 1].id;
      return tagsList.map(item => (
        <Field
          name={'tags'}
          component={Tag}
          tag={item}
          isLastTag={listEnd === item.id && addMarginToLastTag}
          key={item.name}
          onPress={(tag, actionType) => this.handlePressedTag(tag, actionType)}
        />
      ));
    }
  }

  handlePressedTag(tag, actionType) {
    const { lovedTags, hatedTags, onChange } = this.props;
    const tagsArrays = [
      {
        list: lovedTags,
        arrayName: 'lovedTags',
      },
      {
        list: hatedTags,
        arrayName: 'hatedTags',
      },
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsList);
