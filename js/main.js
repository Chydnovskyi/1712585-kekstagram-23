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
