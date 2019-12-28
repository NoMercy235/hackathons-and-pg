import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { MapScreen, NewPlaceScreen, PlaceDetailScreen, PlacesListScreen } from '../screens';
import Colors from '../constants/Colors';
import { Routes } from '../constants/routes';

const PlacesNavigator = createStackNavigator(
  {
    [Routes.Map]: MapScreen,
    [Routes.NewPlace]: NewPlaceScreen,
    [Routes.PlaceDetail]: PlaceDetailScreen,
    [Routes.Places]: PlacesListScreen,
  },
  {
    initialRouteName: Routes.Places,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.forOs.primary(),
      },
      headerTintColor: Colors.forOs.white(),
    }
  }
);

export default createAppContainer(PlacesNavigator);
