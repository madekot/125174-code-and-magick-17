'use strict';
(function () {
  var getRandomNumber = function (min, max) {
    var result = min - 0.5 + Math.random() * (max - min + 1);
    result = Math.round(result);
    return result;
  };
  var getRandomBoolean = function () {
    return Boolean(getRandomNumber(0, 1));
  };
  var getRandomArrayElement = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };
  window.random = {
    number: getRandomNumber,
    boolean: getRandomBoolean,
    arrayElement: getRandomArrayElement,
  };
})();
