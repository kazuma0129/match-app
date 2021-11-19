import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { RootTabScreenProps } from '../types';

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

export default function Example({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [messages, setMessages] = useState<Array<Message>>([]);

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
