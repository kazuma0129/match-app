import React from 'react';
import { View, Text } from 'react-native';
import { OneScreenProps } from '../navigation/types';

export default function Profile({ route, navigation }: OneScreenProps<'Profile'>) {
  return (
    <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}
