import React from 'react';
import { HeaderButton as RNHeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

function HeaderButton (props) {
  return (
    <RNHeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.forOs.white()}
    />
  );
}

export default HeaderButton;
