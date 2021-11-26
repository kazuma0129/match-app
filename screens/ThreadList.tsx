import React, { useState, useEffect } from 'react';

import { View, FlatList, StyleSheet, StatusBar, TextInput, Platform } from 'react-native';

import { useForm, Controller } from 'react-hook-form';

import { OneScreenProps } from '../navigation/types';
import { Thread } from '../models/threads';
import { Message } from '../models/messages';

import { threadList, messageList } from '../demo';

import ThreadItem from '../components/ThreadItem';
import ActivityItem from '../components/ActivityItem';

import { filterObjArrayByRegexp } from '../helpers/regexp';
import { upsertValArray } from '../helpers/map';

const messageListMap = messageList.reduce((ret, m) => {
  upsertValArray(ret, m.threadId, m);
  return ret;
}, new Map<string, Message[]>());

type SearchData = {
  displayName: string;
};

export default function ThreadList({ navigation }: OneScreenProps<'ThreadList'>) {
  const { control, handleSubmit } = useForm<SearchData>();
  const [formVal, setFormVal] = useState(``);
  const [thList, setthList] = useState(threadList);

  const onChangeVal = (val: string) => {
    setFormVal(val);
  };

  useEffect(() => {
    const newList = filterObjArrayByRegexp(formVal, threadList, ['members', 0, 'displayName']);
    setthList(newList);
  }, [formVal, setthList]);

  const renderItemVertical = ({ item, index }: { item: Thread; index: number }) => {
    const subs = (() => {
      const arr = messageListMap.get(item.threadId);
      if (arr) {
        return arr[0].body;
      }
    })();

    return (
      <ThreadItem
        heading={item.members[0].displayName}
        subs={subs}
        imageUri={item.members[0].avatar}
        index={index}
        onPress={() => {
          navigation.navigate('Thread', item);
        }}
        onCirclePressOut={() => {
          navigation.navigate('Profile', item.members[0]);
        }}
      />
    );
  };

  const renderItemHorizontal = ({ item }: { item: Thread }) => {
    return <ActivityItem user={item.members[0]} />;
  };

  return (
    <View style={{ height: '100%' }}>
      <View
        style={{
          paddingVertical: 50,
          paddingHorizontal: 20,
        }}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{}}
              autoCapitalize='none'
              placeholder='search matches'
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                onChangeVal(value);
              }}
              value={value}
            />
          )}
          name='displayName'
          rules={{
            required: true,
            maxLength: 10,
          }}
          defaultValue=''
        />
      </View>

      <View
        style={{
          overflow: 'hidden',
          borderWidth: 0.5,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <FlatList
            data={threadList}
            renderItem={renderItemHorizontal}
            keyExtractor={(item) => item._uid}
            horizontal={true}
          />
        </View>
        <View style={{ height: '100%' }}>
          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== 'android'
                ? ({ highlighted }) => (
                    <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
                  )
                : null
            }
            data={thList}
            renderItem={renderItemVertical}
            keyExtractor={(item) => item._uid}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  separator: {
    borderWidth: 0.5,
    marginHorizontal: 20,
  },
  item: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
  },
});
