import { Data, Uid, List } from './common';
import { UserPublic } from './users';

export type ThreadId = Uid;

export type ThreadBase = {
  threadId: ThreadId;
  members: UserPublic[];
};

export type Thread = Data & ThreadBase;

export type ThreadList = List<Thread>;
