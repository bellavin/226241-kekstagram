'use strict';

(function () {
  window.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = window.getRandomInt(0, i);
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  window.testUnique = function (array) {
    for (var i = 0; i < array.length - 1; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i].toLowerCase() === array[j].toLowerCase()) {
          return false;
        }
      }
    }
    return true;
  };

  window.copyArray = function (array) {
    var newArray = [];
    array.forEach(function (elem, index) {
      newArray[index] = elem;
    });
    return newArray;
  };


  window.debounce = function (fun, interval) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, interval);
    };
  };
})();
