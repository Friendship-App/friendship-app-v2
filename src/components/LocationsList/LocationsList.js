import React from 'react';
import MultiSelect from '../../utils/react-native-multiple-select/lib/react-native-multi-select';
import { connect } from 'react-redux';
import Loading from '../Loading';
import { fetchLocations } from '../../actions/locations';

const mapStateToProps = state => ({
  locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
  fetchLocations: () => dispatch(fetchLocations()),
});

class LocationsList extends React.Component {
  state = {
    selectedLocations: [],
    initialized: false,
  };

  componentWillMount() {
    this.props.fetchLocations();
    this.setState({ selectedLocations: this.props.selectedLocations });
  }

  render() {
    const { input, locations, editProfile } = this.props;
    const { selectedLocations } = this.state;

    if (locations.isLoading) {
      return <Loading />;
    }

    return (
      <MultiSelect
        hideTags
        items={locations.locationsList}
        uniqueKey="id"
        hideSubmitButton={true}
        fixedHeight={true}
        onSelectedItemsChange={locations => {
          input.onChange(locations);
          this.setState({ selectedLocations: locations });
        }}
        selectedItems={selectedLocations}
        selectText="REGION*"
        searchInputPlaceholderText="Search municipalities..."
        selectedItemTextColor="#ff8a65"
        selectedItemIconColor="#ff8a65"
        title="YOUR LOCATION"
        editProfile
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationsList);
