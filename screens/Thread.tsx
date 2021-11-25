import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { OneScreenProps } from '../navigation/types';

type Uid = number;

type User = {
  _id: Uid;
  name: string;
  avatar: string;
};

type Message = {
  _id: Uid;
  text: string;
  createdAt: Date;
  user: User;
};

export default function Thread({ route, navigation }: OneScreenProps<'Thread'>) {
  const [title, setTitle] = useState(route.params.members[0].displayName);
  useEffect(() => {
    navigation.setOptions({ title });
  }, [title, setTitle]);

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
