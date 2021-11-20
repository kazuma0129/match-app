import { Card } from './screens/Swipe';

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
