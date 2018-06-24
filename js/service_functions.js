'use strict';

(function () {
  window.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
})();
