import '../nouislider/nouislider.js';
import {imgUploadPreview} from './form.js';

const effectLevel = document.querySelector('.effect-level');
const effectLevelContainer = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effects = document.querySelector('.effects__list');
const start = 100;
const min = 0;
const max = 3;
const step = 1;
const stepOne = 0.1;

const connect = 'lower';

noUiSlider.create(effectLevelContainer, {
  start: start,
  range: {
    min: min,
    max: start,
  },
  step: step,
  connect: connect,
});

let effect = 'none';

const resetEffect = function () {
  imgUploadPreview.style.removeProperty('filter');
  imgUploadPreview.removeAttribute('class');
  effectLevel.classList.add('hidden');
};

effectLevel.classList.add('hidden');

effects.addEventListener('click',(evt) => {
  if (evt.target.tagName === 'INPUT') {
    effect = evt.target.value;
    effectLevel.classList.remove('hidden');
    imgUploadPreview.removeAttribute('class');
    imgUploadPreview.classList.add(`effects__preview--${effect}`);

    if (effect === 'chrome') {
      effectLevelContainer.noUiSlider.updateOptions({
        range: {
          min: min,
          max: step,
        },
        step: stepOne,
        start: step,
      });

      effectLevelContainer.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `grayscale(${effectLevelValue.value})`;
      });
    }

    if (effect === 'sepia') {
      effectLevelContainer.noUiSlider.updateOptions({
        range: {
          min: min,
          max: step,
        },
        step: stepOne,
        start: step,
      });

      effectLevelContainer.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `sepia(${effectLevelValue.value})`;
      });
    }

    if (effect === 'marvin') {
      effectLevelContainer.noUiSlider.updateOptions({
        range: {
          min: min,
          max: start,
        },
        step: step,
        start: start,
      });

      effectLevelContainer.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `invert(${effectLevelValue.value}%)`;
      });
    }

    if (effect === 'phobos') {
      effectLevelContainer.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        step: stepOne,
        start: max,
      });

      effectLevelContainer.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `blur(${effectLevelValue.value}px)`;
      });
    }

    if (effect === 'heat') {
      effectLevelContainer.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        step: stepOne,
        start: max,
      });

      effectLevelContainer.noUiSlider.on('update',(__,handle,unencoded) => {
        effectLevelValue.value = unencoded[handle];
        imgUploadPreview.style.filter = `brightness(${effectLevelValue.value})`;
      });
    }

    if (effect === 'none') {
      resetEffect();
    }
  }
});

export {resetEffect};
