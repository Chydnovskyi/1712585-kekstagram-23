import './utils/data.js';
import './picture.js';
import './big-picture.js';
import './form.js';
import './utils/error.js';
import './utils/succses.js';
import './image-effect.js';
import {RenderError} from './utils/render-error.js';
import {renderPictures} from './picture.js';
import {setUploadForm,closeImgUpload} from './form.js';
import {onImgFilters} from './image-filter.js';
import {getData} from './utils/data.js';

const URL = 'https://23.javascript.pages.academy/kekstagram/data';

const renderData = function (data) {
  renderPictures(data);
  onImgFilters(data);
};

getData(URL,renderData,RenderError);

setUploadForm(closeImgUpload);

export {URL};
