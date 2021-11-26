import { Data, Uid, List } from './common';
import { ThreadId } from './threads';

export type MessageBody = string;

export type MessageMediaType = 'image' | 'video' | 'audio';

export type MessageBase = {
  messageId: Uid;
  body: MessageBody;
  mediaType?: MessageMediaType;
  threadId: ThreadId;
};

export type Message = Data & MessageBase;

export type MessageList = List<Message>;
