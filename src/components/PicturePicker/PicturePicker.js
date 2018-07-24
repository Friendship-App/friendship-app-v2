import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default class PhotoBox extends React.Component {
  state = {
    selected: false,
    picture: null,
  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  openImageGallery = async input => {
    await this.askPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      input.onChange(result);
      this.setState({ selected: true, picture: result });
    }
  };

  renderPicture() {
    if (this.state.picture) {
      return (
        <Image
          style={{ width: 93, height: 93 }}
          source={{ uri: this.state.picture.uri }}
        />
      );
    }
    return (
      <Text
        style={{
          fontSize: 50,
          color: '#60686d',
          textAlign: 'center',
        }}
      >
        +
      </Text>
    );
  }

  deletePicture(input) {
    input.onChange({});
    this.setState({ picture: '' });
  }

  render() {
    const { input } = this.props;

    return (
      <View>
        {this.state.picture ? (
          <TouchableOpacity
            style={{
              height: 25,
              width: 25,
              borderRadius: 100,
              backgroundColor: '#6c6c85',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              left: 80,
              zIndex: 1,
            }}
            onPress={() => this.deletePicture(input)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={{
            width: 93,
            height: 93,
            backgroundColor: '#e8e9e8',
            marginRight: 15,
            marginTop: 15,
            borderWidth: 1,
            borderColor: '#839297',
            justifyContent: 'center',
          }}
          onPress={() => this.openImageGallery(input)}
        >
          {this.renderPicture()}
        </TouchableOpacity>
      </View>
    );
  }
}
