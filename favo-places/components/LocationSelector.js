import React, { useEffect, useState } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import { verifyPermission } from '../utils/permissions';
import MapPreview from './MapPreview';
import { Routes } from '../constants/routes';

function LocationSelector (props) {
  const [isFetching, setIsFetching] = useState(false);
  const [location, setLocation] = useState();

  const pickedLocation = props.navigation.getParam('pickedLocation');
  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      props.onLocationSelected(pickedLocation);
    }
  }, [pickedLocation]);

  const pickMapHandler = () => {
    props.navigation.navigate(Routes.Map);
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission([Permissions.LOCATION]);
    if (!hasPermission) return ;
    try {
      setIsFetching(true);
      const { coords } = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setLocation(coords);
      props.onLocationSelected(pickedLocation);
    } catch (e) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or choose a location on the map',
        [{ text: 'Okey' }]
      )
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onMapClick={pickMapHandler}
      >
        {isFetching
          ? <ActivityIndicator size="large" color={Colors.primary}/>
          : <Text>No location chosen yet!</Text>
        }
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Pick on map"
          color={Colors.forOs.primary()}
          onPress={pickMapHandler}
        />
        <Button
          title="Get user location"
          color={Colors.forOs.primary()}
          onPress={getLocationHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default LocationSelector;
