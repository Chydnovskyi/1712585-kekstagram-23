import {isEsc} from './utils/util.js';
import {body} from './big-picture.js';
import {getArray} from './utils/util.js';
import {showError} from './utils/error.js';
import {showSucces} from './utils/succses.js';
import {resetEffect} from './image-effect.js';
import {setData} from './utils/data.js';
import {URL} from './main.js';

const uploadInput = document.querySelector('.img-upload__input');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadClose = document.querySelector('.img-upload__cancel');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector ('.img-upload__preview').children[0];
const uploadForm = document.querySelector('.img-upload__form');

let transformScale = 100;

const scaleControlSmallerHandler = function () {
  if (scaleControlValue.value > 25) {
    scaleControlValue.value = parseInt(scaleControlValue.value,10) - 25;
    transformScale = scaleControlValue.value / 100;
    imgUploadPreview.style.transform = `scale(${transformScale})`;
  }
};

const scaleControlBiggerHandler = function () {
  if (scaleControlValue.value < 100) {
    scaleControlValue.value = parseInt(scaleControlValue.value,10) + 25;
    transformScale = scaleControlValue.value / 100;
    imgUploadPreview.style.transform = `scale(${transformScale})`;
  }
};

const editScale = function () {
  scaleControlValue.value = 100;
  scaleControlSmaller.addEventListener('click', scaleControlSmallerHandler);
  scaleControlBigger.addEventListener('click', scaleControlBiggerHandler);
};

const setUploadForm = function (onSuccess) {
  uploadForm.addEventListener('submit',(evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formSetSucces = function () {
      onSuccess();
      showSucces();
    };
    setData(URL,formSetSucces,showError,formData);
  });
};

const resetInputValue = function () {
  uploadInput.value = '';
  textHashtags.value = '';
  textDescription.value = '';
  scaleControlValue.value = '';
  transformScale = 1;
  imgUploadPreview.style.transform = `scale(${transformScale})`;
  resetEffect();
};

const isActiveElement = (element) => !(element === textDescription || element === textHashtags);

const validateHashtag = function () {
  const hashtags = textHashtags.value.split(' ');
  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const errors = [];
  let newHashtags = [];

  hashtags.forEach((element) => {
    if (element[0] !== '#') {
      errors.push('Хэш-тег начинается с символа # (решётка)');
    }
    if (!(re.test(element))) {
      errors.push('После решетки могут быть только буквы и/или цифры.\nМаксимальная длина - 20 символов, включая решётку');
    }
    newHashtags.push(element.toLowerCase());
    if (newHashtags.length > 5){
      errors.push('Нельзя указать больше пяти хэш-тегов');
    }
  });
  newHashtags = getArray(newHashtags);
  textHashtags.value = newHashtags.join(' ');
  textHashtags.setCustomValidity(errors.join('. \n'));
};

const closeImgUpload = function () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadClose.removeEventListener('click', closeImgUpload);
  textHashtags.removeEventListener('input', validateHashtag);
  scaleControlBigger.removeEventListener('click', scaleControlBiggerHandler);
  scaleControlSmaller.removeEventListener('click', scaleControlSmallerHandler);
  resetInputValue();
};

const pressEsc = function (evt) {
  if (isEsc(evt) && isActiveElement(document.activeElement)) {
    evt.preventDefault(evt);
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    imgUploadClose.removeEventListener('click', closeImgUpload);
    document.removeEventListener('keydown', pressEsc);
    textHashtags.removeEventListener('input', validateHashtag);
    scaleControlBigger.removeEventListener('click', scaleControlBiggerHandler);
    scaleControlSmaller.removeEventListener('click', scaleControlSmallerHandler);
    resetInputValue();
  }
};

const openUploadForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadClose.addEventListener('click', closeImgUpload);
  document.addEventListener('keydown', pressEsc);
  textHashtags.addEventListener('input', validateHashtag);
  editScale();
};

uploadInput.addEventListener('change',openUploadForm);

export {setUploadForm, closeImgUpload, imgUploadPreview};
