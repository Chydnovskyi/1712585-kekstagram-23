import {getRandomIntInclusive} from './get-randomInt-inclusive.js';

const NAMES = ['Артем', 'Татьяна', 'Михаил', 'Ирина', 'Екатерина'];
const MASSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COUNT = 25;

function createRandomComment(index) {
  return {
    id: index,
    avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
    message: MASSAGES[getRandomIntInclusive(0, MASSAGES.length - 1)],
    name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
  };
}


function createRandomItem(index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: 'Описание',
    likes: getRandomIntInclusive(15, 200),
    comments: new Array(5).fill(null).map((item, commentIndex) => createRandomComment(`${index + 1}${commentIndex}`)),
  };
}

const getRandomItems =  new Array(COUNT).fill(null).map((item, index) => createRandomItem(index));

export {getRandomItems};
