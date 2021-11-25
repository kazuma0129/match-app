import { Data, Uid, List } from './common';

export type MessageBody = string;

export type MessageMediaType = 'image' | 'video' | 'audio';

export type MessageBase = {
  messageId: Uid;
  body: MessageBody;
  mediaType?: MessageMediaType;
};

export type Message = Data & MessageBase;

export type MessageList = List<Message>;
