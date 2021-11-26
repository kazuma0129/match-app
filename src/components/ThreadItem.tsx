import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

export default function ThreadItem({
  heading,
  subs,
  imageUri,
  onPress,
  onCirclePressOut,
  index,
}: {
  heading: string;
  subs?: string;
  imageUri?: string;
  onPress?: any;
  onCirclePressOut?: any;
  index: number;
}) {
  return (
    <TouchableOpacity
      style={{
        padding: 20,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          height: 50,
          width: 50,
          borderRadius: 100,
          borderWidth: 1,
          marginRight: 10,
          overflow: 'hidden',
        }}
        onPressOut={onCirclePressOut}
      >
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: imageUri }}
          resizeMode='contain'
        ></Image>
      </TouchableOpacity>

      <View style={{ flexDirection: 'column' }}>
        <Text style={{ fontSize: 14 }}>{heading}</Text>
        <Text style={{ fontSize: 16 }}>{subs}</Text>
      </View>
    </TouchableOpacity>
  );
}
