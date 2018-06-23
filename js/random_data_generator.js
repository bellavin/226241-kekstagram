// Генератор случайных данных

'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 2;

  var MIN_LIKES = 15;
  var MAX_LIKES = 200;


  window.generateData = function (numOfElements) {
    var photos = [];

    for (var i = 0; i < numOfElements; i++) {
      var shuffledComments = window.shuffleArray(COMMENTS); // Перетряхиваем массив комментариев
      var currentComments = window.sliceArray(shuffledComments, MIN_COMMENTS, MAX_COMMENTS); // Забираем несколько из массива
      var likes = window.getRandomInt(MIN_LIKES, MAX_LIKES); // Количество лайков
      var description = window.getRandomArraysItem(DESCRIPTIONS); // Подставляем выбранное описание

      photos[i] =
        {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: likes,
          comments: currentComments,
          description: description
        };
    }

    return photos;
  };
})();
