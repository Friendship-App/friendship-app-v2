import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import Mood from '../Mood';
import Loading from '../Loading';
import { paddings } from '../../styles';
import { fetchMoods } from '../../actions/moods';

const mapDispatchToProps = dispatch => ({
  fetchMood: () => dispatch(fetchMoods()),
});

const mapStateToProps = state => ({
  moods: state.moods,
});

class MoodList extends React.Component {
  state = {
    mood: '',
  };

  componentWillMount() {
    this.props.fetchMood();
    if (this.props.editProfile) {
      this.setState({ mood: this.props.selectedMood });
    }
  }

  updateMood = newMood => {
    this.setState({ mood: newMood });
  };

  render() {
    const { input } = this.props;

    if (this.props.moods.isLoading) {
      return <Loading />;
    }

    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewMoodContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ height: 70, marginTop: paddings.XS }}
      >
        {this.renderMoods(input)}
      </ScrollView>
    );
  }

  checkMood(e) {
    return e === this.state.mood ? '' : e;
  }

  _keyExtractor = (item, index) => `moodList-${item.id}`;

  renderMoods(input) {
    return this.props.moods.moodsList.map((mood, index) => (
      <Mood
        updateMood={newMood => {
          let result = this.checkMood(newMood);
          input.onChange(result);
          this.updateMood(result);
        }}
        selectedMood={input.mood}
        key={this._keyExtractor(mood)}
        mood={mood.uri}
        selected={this.state.mood === mood.uri}
        first={index === 0}
      />
    ));
  }
}

const styles = {
  scrollViewMoodContainer: {
    justifyContent: 'space-around',
    height: 70,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoodList);
