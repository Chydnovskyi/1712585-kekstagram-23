import {getRandomItems} from './utils/data.js';

const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture');

getRandomItems.forEach((elem,index) => {
  const template = pictureTemplate.cloneNode(true);
  const element = template.content.querySelector('.picture');
  element.href = getRandomItems[index].url;
  element.querySelector('.picture__img').src = getRandomItems[index].url;
  element.querySelector('.picture__likes').textContent = getRandomItems[index].likes;
  element.querySelector('.picture__comments').textContent = getRandomItems[index].comments.length;
  fragment.appendChild(element);
});

pictures.appendChild(fragment);
