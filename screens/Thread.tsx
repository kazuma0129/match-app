import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import * as ThreadModel from '../models/threads';
import * as UserModel from '../models/users';
import * as MessageModel from '../models/messages';

import { OneScreenProps } from '../navigation/types';

import { messageList, ME as demoMe } from '../demo';

type GCID = string;

type GCUser = {
  _id: GCID;
  name: string;
  avatar?: string;
};

type GCMessage = {
  _id: GCID;
  text: string;
  createdAt: Date;
  user: GCUser;
};

const formatToGCUser = (user: UserModel.UserPublic): GCUser => {
  return {
    _id: user.userId,
    name: user.displayName,
    avatar: user.avatar,
  };
};

const ME = formatToGCUser(demoMe);

const formatToGCMessages = (
  message: MessageModel.Message,
  user: UserModel.UserPublic
): GCMessage => {
  const u = message.createdBy === ME._id ? ME : formatToGCUser(user);
  return {
    _id: message.messageId,
    text: message.body,
    createdAt: new Date(message.createdAt),
    user: u,
  };
};

export default function Thread({ route, navigation }: OneScreenProps<'Thread'>) {
  const thread: ThreadModel.Thread = route.params;
  const user = thread.members[0];

  const demoMessages = messageList.filter((e) => e.threadId === thread.threadId);

  const [title, setTitle] = useState(user.displayName);
  useEffect(() => {
    navigation.setOptions({ title });
  }, [title, setTitle]);

  const initialMessages = demoMessages.map((m) => {
    return formatToGCMessages(m, user);
  });

  const [messages, setMessages] = useState<GCMessage[]>(initialMessages);

  const onSend = useCallback((messages: GCMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    // CAUTION: just Echolalia
    const _id = messages[0]._id.slice(0, -1) + '1';
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [{ ...messages[0], _id, user: formatToGCUser(user) }])
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      onPressAvatar={() => {
        navigation.navigate('Profile', user);
      }}
      user={ME}
    />
  );
}
