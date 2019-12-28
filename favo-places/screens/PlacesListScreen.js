import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import { isAndroid } from '../utils/utils';
import { Routes } from '../constants/routes';
import PlaceListItem from '../components/PlaceListItem';
import { loadPlaces } from '../store/places';

const renderPlaceListItem = props => ({ item }) => {
  const navOptions = {
    place: item,
  } ;

  return (
    <PlaceListItem
      {...item}
      onSelect={() => props.navigation.navigate(Routes.PlaceDetail, navOptions)}
    />
  );
};

function PlacesListScreen (props) {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, []);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={renderPlaceListItem(props)}
    />
  );
}

const navigateToNewPlace = (navData) => () => navData.navigation.navigate(Routes.NewPlace);

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: (
      <HeaderButtons title="Menu" HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add place"
          iconName={isAndroid ? 'md-add' : 'ios-add'}
          onPress={navigateToNewPlace(navData)}
        />
      </HeaderButtons>
    ),
  }
};

export default PlacesListScreen;
