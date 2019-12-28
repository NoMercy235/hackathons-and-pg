import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

export const verifyPermission = async (permissions) => {
  const result = await Permissions.askAsync(...permissions);
  if (result.status !== 'granted') {
    Alert.alert(
      `No access to the ${permissions.join(', ')}`,
      `You need to grant the "${permissions.join(', ')}" permission to use this app`,
      [{ text: 'Okey' }],
    );
    return false;
  }
  return true;
};
