import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import { verifyPermission } from '../utils/permissions';

function ImageSelector (props) {
  const [image, setImage] = useState();

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission([Permissions.CAMERA, Permissions.CAMERA_ROLL]);
    if (!hasPermission) return ;
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (image.cancelled) return ;
    setImage(image);
    props.onImageSelected(image);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {image
          ? (
            <Image
              style={styles.image}
              source={{ uri: image.uri }}
            />
          )
          : <Text>No image picked yet</Text>
        }
      </View>
      <Button
        title="Take image"
        color={Colors.forOs.primary()}
        onPress={takeImageHandler}
      >
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageSelector;
