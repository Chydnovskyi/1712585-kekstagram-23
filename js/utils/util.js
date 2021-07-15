function lineLength(rowLine, maxLength) {
  return rowLine.length <= maxLength;
}

lineLength('test', 6);

export {lineLength};
