import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { UserPublic } from '../models/users';

export default function ActivityItem({ user }: { user: UserPublic }) {
  return (
    <TouchableOpacity
      style={{
        height: 75,
        width: 75,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'gray',
        overflow: 'hidden',
      }}
    >
      <Image
        style={{ width: '100%', height: '100%' }}
        source={{ uri: user.avatar }}
        resizeMode='contain'
      ></Image>
    </TouchableOpacity>
  );
}
