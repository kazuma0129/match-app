import React from 'react';

import { View, FlatList, StyleSheet, Text, StatusBar, Pressable } from 'react-native';

import { OneScreenProps } from '../navigation/types';
import { Thread } from '../models/threads';
import { UserPublic } from '../models/users';

const users: UserPublic[] = [
  {
    userId: '1001',
    displayName: 'Steve',
  },
  {
    userId: '1002',
    displayName: 'Mike',
  },
  {
    userId: '1003',
    displayName: 'Andy',
  },
  {
    userId: '1004',
    displayName: 'John',
  },
  {
    userId: '1005',
    displayName: 'Jenny',
  },
  {
    userId: '1006',
    displayName: 'Bob',
  },
];

const threadList: Thread[] = [
  {
    _uid: '10101',
    createdAt: Date.now().valueOf(),
    threadId: '1010101',
    members: [users[0]],
  },
  {
    _uid: '10102',
    createdAt: Date.now().valueOf(),
    threadId: '1010102',
    members: [users[1]],
  },
  {
    _uid: '10103',
    createdAt: Date.now().valueOf(),
    threadId: '1010103',
    members: [users[2]],
  },
  {
    _uid: '10104',
    createdAt: Date.now().valueOf(),
    threadId: '1010104',
    members: [users[3]],
  },
  {
    _uid: '10105',
    createdAt: Date.now().valueOf(),
    threadId: '1010105',
    members: [users[4]],
  },
  {
    _uid: '10106',
    createdAt: Date.now().valueOf(),
    threadId: '1010106',
    members: [users[5]],
  },
];

const Item = ({ title, onPress }: { title: string; onPress: any }) => (
  <Pressable style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
  </Pressable>
);

export default function ThreadList({ navigation }: OneScreenProps<'ThreadList'>) {
  const renderItem = ({ item }: { item: Thread }) => (
    <Item
      title={item.members[0].displayName}
      onPress={() => {
        navigation.navigate('Thread', item);
      }}
    />
  );

  return <FlatList data={threadList} renderItem={renderItem} keyExtractor={(item) => item._uid} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
