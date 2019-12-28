import React, { useCallback, useState } from 'react';
import { ScrollView, View, Button, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { addPlace } from '../store/places';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';

function NewPlaceScreen (props) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [location, setLocation] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitle(text);
  };

  const onImageSelected = image => {
    setImage(image);
  };

  const onLocationSelected = useCallback(({ latitude, longitude }) => {
    setLocation({ lat: latitude, lng: longitude });
  }, []);

  const onSubmit = () => {
    dispatch(addPlace(title, image.uri, location));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <ImageSelector
          onImageSelected={onImageSelected}
        />
        <LocationSelector
          navigation={props.navigation}
          onLocationSelected={onLocationSelected}
        />
        <Button
          title="Save place"
          color={Colors.primary}
          onPress={onSubmit}
        />
      </View>
    </ScrollView>
  );
}

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add place',
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  }
});

export default NewPlaceScreen;
