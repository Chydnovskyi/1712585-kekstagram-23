import {openBigPicture} from './big-picture.js';

const RERENDER_DELAY = 500;
const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture');

let clickHandler;

const debounce = function (func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const checkLater = function() {
      timeout = null;
      if (!immediate) {func.apply(context, args);}
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(checkLater, wait);

    if (callNow) {func.apply(context, args);}
  };
};

const clearPictures = debounce(() => {
  const visiblePictures = pictures.querySelectorAll('.picture');
  visiblePictures.forEach((elem) => {
    elem.remove();
  });
  pictures.removeEventListener('click',clickHandler);
}, RERENDER_DELAY);

const renderPictures = debounce((data) => {
  data.forEach((elem,index) => {
    const template = pictureTemplate.cloneNode(true);
    const element = template.content.querySelector('.picture');
    element.href = data[index].url;
    element.querySelector('.picture__img').src = data[index].url;
    element.querySelector('.picture__likes').textContent = data[index].likes;
    element.querySelector('.picture__comments').textContent = data[index].comments.length;
    fragment.appendChild(element);
  });

  pictures.appendChild(fragment);

  clickHandler = (picture) => {
    openBigPicture(picture,data);
  };

  pictures.addEventListener('click',clickHandler);
}, RERENDER_DELAY);

export {renderPictures,clearPictures};
