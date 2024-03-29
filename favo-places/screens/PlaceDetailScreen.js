import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';
import { Routes } from '../constants/routes';

function PlaceDetailScreen (props) {
  const place = props.navigation.getParam('place');

  const seeMap = () => {
    props.navigation.navigate(Routes.Map, {
      readonly: true,
      initialLocation: { latitude: place.lat, longitude: place.lng }
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image
        style={styles.image}
        source={{ uri: place.image }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={{ latitude: place.lat, longitude: place.lng }}
          onMapClick={seeMap}
        />
      </View>
    </ScrollView>
  );
}

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('place').title,
  }
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlaceDetailScreen;
