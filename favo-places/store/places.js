import * as FileSystem from 'expo-file-system';

import { Place } from '../models/place';
import { getPlaces, insertPlace } from '../utils/db';
import { Env } from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const LOAD_PLACES = 'LOAD_PLACES';

export const loadPlaces = () => {
  return async dispatch => {
    const { rows: { _array: places } } = await getPlaces();
    dispatch({
      type: LOAD_PLACES,
      payload: places,
    });
  };
};

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    let address = 'Dummy address';

    if (location) {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${Env.googleApiKey}`);
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length) {
          address = data.results[0].formatted_address;
        }
      }
    }

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbResult = await insertPlace(new Place({
        title,
        image: newPath,
        address,
        ...(location || { lat: 16.33, lng: 14.5 }),
      }));

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PLACES:
      return { ...state, places: action.payload.map(item => new Place(item)) };
    case ADD_PLACE:
      const { id, title, image } = action.payload;
      const place = new Place({ id, title, image });
      return { ...state, places: state.places.concat(place) };
    default:
      return state;
  }
};
