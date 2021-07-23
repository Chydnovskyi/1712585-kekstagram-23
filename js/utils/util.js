const getArray = function (arr) {
  const resultItems = [];
  for (const str of arr) {
    if (!resultItems.includes(str)) {
      resultItems.push(str);
    }
  }
  return resultItems;
};

const mix = function (arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
};

const isEsc = function (evt) {
  if (evt.keyCode === 27) {
    return true;
  }
};

function lineLength(rowLine, maxLength) {
  return rowLine.length <= maxLength;
}

lineLength('test', 6);

function getRandomIntInclusive(min, max) {
  if (min > max || min < 0) {
    return 'error';
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(1, 5);

export {getArray, mix, isEsc, getRandomIntInclusive, lineLength};
