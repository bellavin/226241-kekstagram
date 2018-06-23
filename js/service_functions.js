// Служебные функции

/**
 * 1) Генератор случайных чисел
 * 2) Функция перетасовывающая массив
 * 3) Функция, которая берет произвольный элемент массива
 * 4) Функция обрезающая массив до нужной длинны (оставляет один или два элемента)
 * 5) Проверка уникальности элемента массива
 */

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


  window.getRandomArraysItem = function (array) {
    var randomIndex = window.getRandomInt(0, array.length - 1);
    return array[randomIndex];
  };


  window.sliceArray = function (array, firstElement, lastElement) {
    var arrayLength = window.getRandomInt(firstElement, lastElement);
    return array.slice(0, arrayLength);
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
