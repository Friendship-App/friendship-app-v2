import React from 'react';
import {Text, View} from "react-native";
import RegisterHeader from "../RegisterHeader";
import {PERSONALITIES} from "../ProgressSteps";
import styles from "./styles";
import {fetchPersonalities} from "../../actions/personalities";
import {connect} from "react-redux";
import {colors, fonts, fontSizes, paddings} from "../../styles";
import {Field} from "redux-form";
import PersonalitiesPicker from "../PersonalitiesPicker";
import Footer from "../Footer";

const mapDispatchToProps = dispatch => ({
  fetchPersonalities: () => {
    dispatch(fetchPersonalities());
  },
});

const mapStateToProps = state => ({
  personalities: state.personalities,
});

const initialState = {
  progress: 1,
  selectedPersonalities: []
};

class PersonalitiesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    this.props.fetchPersonalities();
  }

  render() {
    return (
      <View style={styles.personalitiesForm}>
        <RegisterHeader headerTitle={'PERSONALITY'} processStage={PERSONALITIES} backgroundStyle={'dark'}/>
        <View style={{flexDirection: 'row', paddingHorizontal: paddings.LG}}>
          <Text
            style={{
              fontFamily: fonts.BOLD,
              fontSize: fontSizes.BODY_TEXT,
              color: colors.DUST_WHITE,
            }}
          >
            {this.state.progress}/{this.props.personalities.personalitiesList.length /
          2}{' '}
          </Text>
          <Text style={{
            fontFamily: fonts.REGULAR,
            fontSize: fontSizes.BODY_TEXT,
            color: colors.DUST_WHITE,
          }}>Lifestyle</Text>
        </View>
        <View style={{flex: 1, paddingHorizontal: paddings.LG, paddingTop: paddings.XS}}>
          <Text style={{
            fontFamily: fonts.REGULAR,
            fontSize: fontSizes.BODY_TEXT,
            color: colors.DUST_WHITE,
          }}>Are you more ...</Text>
          {this.renderTwoPersonalities()}
        </View>
        {/*<Footer disabled={!(this.state.selectedPersonalities.length === this.state.progress)} onPress={() => {
          this.state.progress < (this.props.personalities.personalitiesList.length / 2) ? this.setState(prevState => ({progress: prevState.progress + 1})) : console.log('next')
        }}>
          <Text>Next</Text>
        </Footer>*/}
      </View>
    );
  };

  renderTwoPersonalities() {
    const {progress} = this.state;
    const personalities = [...this.props.personalities.personalitiesList];

    if (personalities.length > 0) {
      const posToStart = (personalities.length / (personalities.length / 2)) * progress;
      personalities.splice(0, posToStart - 2);
      personalities.splice(posToStart);
      return (
        <Field
          name={'personalities'}
          component={PersonalitiesPicker}
          personalities={personalities}
          onPress={(value) => {
            const tmpSelectedPersonalities = this.state.selectedPersonalities;
            tmpSelectedPersonalities.push(value);
            if (this.state.progress < (this.props.personalities.personalitiesList.length / 2)) {
              this.props.change('personalities', tmpSelectedPersonalities);
              this.setState(prevState => ({progress: prevState.progress + 1}));
            } else {
              this.props.handleSubmit();
            }
          }}
        />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalitiesForm);