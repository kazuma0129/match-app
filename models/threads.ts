import { Data, Uid, List } from './common';
import { UserPublicList, UserPublic } from './users';

export type ThreadBase = {
  threadId: Uid;
  members: UserPublic[];
};

export type Thread = Data & ThreadBase;

export type ThreadList = List<Thread>;
