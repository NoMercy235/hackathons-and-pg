import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';
import { Routes } from '../constants/routes';


function MapScreen (props) {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: 44.4268,
    longitude: 26.1025,
    ...(selectedLocation || {}),
    latitudeDelta: 0.922,
    longitudeDelta: 0.421,
  };

  const selectLocationHandler = ({ nativeEvent: { coordinate } }) => {
    setSelectedLocation(coordinate);
  };

  const savePickedLocationHandler = useCallback(() => {
    if (readonly) return;
    props.navigation.navigate(
      Routes.NewPlace,
      { pickedLocation: selectedLocation }
    );
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocationHandler,
    })
  }, [savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={mapRegion}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="PickedLocation"
          coordinate={selectedLocation}
        />
      )}
    </MapView>
  );
}

MapScreen.navigationOptions = navData => {
  const onSaveLocation = navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');

  return {
    headerRight: !readonly && (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onSaveLocation}
      >
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  }
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Colors.forOs.white()
  }
});

export default MapScreen;
