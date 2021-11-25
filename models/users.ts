import { Data, Uid, List } from './common';

type DisplayName = string;
type Bio = string;

type BirthYear = number;
type BirthMonth = number;
type BirthDay = number;

export type UserBirth = {
  year: BirthYear;
  month: BirthMonth;
  day: BirthDay;
};

export type User = Data & UserBase;
export type UserList = List<User>;

export type UserBase = {
  userId: Uid;
  displayName: DisplayName;
  bio?: Bio;
};

export type UserPublic = UserBase;
export type UserPublicList = List<UserPublic>;
