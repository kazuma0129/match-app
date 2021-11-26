import { Card } from './screens/Swipe';
import { UserPublic } from './models/users';
import { Thread } from './models/threads';
import { Message } from './models/messages';

const images = [
  'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif',
  'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif',
  'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif',
  'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif',
  'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif',
  'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif',
  'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif',
  'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif',
  'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif',
  'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif',
  'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif',
  'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif',
  'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif',
];

const avatar = 'https://placeimg.com/140/140/people';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const names = ['John', 'Kazuma', '一真', 'はちみつ', 'アレクサ', 'John Doe', 'コロッセオおじさん'];

function getRandomIntRange(from: number, to: number) {
  const f = getRandomInt(from);
  const t = getRandomInt(to);
  return t >= f ? t - f : f - t;
}

export const cards1: Card[] = [...Array(5)].map((_, index) => {
  return {
    name: String(index),
    username: names[getRandomInt(names.length - 1)],
    age: getRandomIntRange(18, 60),
    gender: getRandomInt(1) === 0 ? 'male' : 'female',
    image: images[index],
  };
});

export const cards2: Card[] = [...Array(3)].map((_, index) => {
  return {
    name: String(index),
    username: names[getRandomInt(names.length - 1)],
    age: getRandomIntRange(18, 60),
    gender: getRandomInt(1) === 0 ? 'male' : 'female',
    image: images[images.length - 1 - index],
  };
});

export const users: UserPublic[] = [
  {
    userId: '1001',
    displayName: 'Steve',
    bio: 'Lolem ipsum.......akakka',
    avatar,
  },
  {
    userId: '1002',
    displayName: 'Mike',
    bio: 'Lolem ipsum.......akakka',
    avatar,
  },
  {
    userId: '1003',
    displayName: 'Andy',
    bio: 'Lolem ipsum.......akakka',
    avatar,
  },
  {
    userId: '1004',
    displayName: 'John',
    bio: 'Lolem ipsum.......akakka',
    avatar,
  },
  {
    userId: '1005',
    displayName: 'Jenny',
    bio: 'Lolem ipsum.......akakka',
    avatar,
  },
  {
    userId: '1006',
    displayName: 'Bob',
    bio: 'Lolem ipsum.......akakka',
    avatar,
  },
];

export const ME: UserPublic = {
  userId: '999',
  displayName: 'me',
  avatar: 'https://placeimg.com/140/140/animals',
};

export const threadList: Thread[] = [
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

export const messageList: Message[] = [
  {
    _uid: '01',
    createdAt: Date.now().valueOf(),
    messageId: '01',
    body: 'Hey, guys',
    threadId: threadList[0].threadId,
    createdBy: threadList[0].members[0].userId,
  },
  {
    _uid: '012',
    createdAt: Date.now().valueOf(),
    messageId: '012',
    body: 'Hahaha',
    threadId: threadList[0].threadId,
    createdBy: threadList[0].members[0].userId,
  },
  {
    _uid: '013',
    createdAt: Date.now().valueOf(),
    messageId: '013',
    body: 'DAMN',
    threadId: threadList[0].threadId,
    createdBy: ME.userId,
  },
  {
    _uid: '02',
    createdAt: Date.now().valueOf(),
    messageId: '02',
    body: "What's up?",
    threadId: threadList[1].threadId,
    createdBy: threadList[1].members[0].userId,
  },
  {
    _uid: '03',
    createdAt: Date.now().valueOf(),
    messageId: '03',
    body: "What's going on?",
    threadId: threadList[2].threadId,
    createdBy: threadList[2].members[0].userId,
  },
  {
    _uid: '03',
    createdAt: Date.now().valueOf(),
    messageId: '03',
    body: 'YOU DIED',
    threadId: threadList[3].threadId,
    createdBy: threadList[3].members[0].userId,
  },
];
