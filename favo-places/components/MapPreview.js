import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Env } from '../env';

const getUrl = (lat, lng) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${Env.googleApiKey}`;

function MapPreview (props) {
  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onMapClick}
    >
      {props.location
        ? (
          <Image
            style={styles.mapImage}
            source={{ uri: getUrl(props.location.latitude, props.location.longitude) }}
          />
        )
        : props.children
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  }
});

export default MapPreview;
