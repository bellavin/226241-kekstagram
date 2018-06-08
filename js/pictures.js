'use strict';


/**
 * РАНДОМАЙЗЕРЫ И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
 */
(function () {
  // Генератор случайных чисел
  window.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  // Перетряхиваем массив
  window.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = window.getRandomInt(0, i);
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };


  // Обрезает массив до нужной длинны (в случае с кестаграммом, оставляет один или два элемента)
  window.sliceArray = function (array, firstElement, lastElement) {
    var arrayLength = window.getRandomInt(firstElement, lastElement);
    return array.slice(0, arrayLength);
  };
})();


/**
 * ГЕНЕРАТОР СЛУЧАЙНЫХ ДАННЫХ
 */
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

  var MIN_COMMENTS = 1; // Минимальное количество комментариев
  var MAX_COMMENTS = 2; // Максимальное количество комментариев

  var MIN_LIKES = 15; // Минимальное количество лайков
  var MAX_LIKES = 200; // Максимальное количество лайков


  // Генератор массива фотографий
  window.getPhotoElements = function (numOfElements) {
    var photos = [];

    for (var i = 0; i < numOfElements; i++) {
      var comments = window.shuffleArray(COMMENTS); // Перетряхиваем массив комментариев
      var someOfComments = window.sliceArray(comments, MIN_COMMENTS, MAX_COMMENTS); // Забираем несколько из массива
      var likes = window.getRandomInt(MIN_LIKES, MAX_LIKES); // Количество лайков
      var descriptionIndex = window.getRandomInt(0, DESCRIPTIONS.length - 1); // Выбираем одно из описаний
      var description = DESCRIPTIONS[descriptionIndex]; // Подставляем выбранное описание

      photos[i] =
        {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: likes,
          comments: someOfComments,
          description: description
        };
    }

    return photos;
  };
})();


/**
 * ОТРИСОВКА ПРЕВЬЮ НА ГЛАВНОЙ СТРАНИЦЕ
 */
(function () {
  // Создаем DOM элементы
  var getPictureElement = function (picture) {
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return pictureElement;
  };


  // Отрисовываме DOM элементы на странице
  window.renderPictureElement = function (pictures) {
    var picturesListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(getPictureElement(pictures[i]));
    }

    picturesListElement.appendChild(fragment);
  };
})();


/**
 * ПРОСМОТР ФОТОГРАФИЙ
 */
(function () {
  var BIG_PICTURE = document.querySelector('.big-picture');


  // Разворачиваем полную версию фотографии с комментариями и описанием
  var setupBigPicture = function (data) {
    BIG_PICTURE.querySelector('.big-picture__img img').src = data.url; // Выбираем аватарку
    BIG_PICTURE.querySelector('.likes-count').textContent = data.likes; // Количество лайков
    BIG_PICTURE.querySelector('.social__caption').textContent = data.description; // Описание фотографии
    BIG_PICTURE.classList.remove('hidden');
  };


  // Удаляем старые комментарии
  var removeOldComments = function () {
    var pictureComments = BIG_PICTURE.querySelector('.social__comments');
    var removedComments = BIG_PICTURE.querySelectorAll('.social__comment');
    for (var i = 0; i < removedComments.length; i++) {
      pictureComments.removeChild(removedComments[i]);
    }
  };


  // Добавляем комментарии
  var appendComments = function (data) {
    for (var i = 0; i < data.comments.length; i++) {
      var pictureComments = BIG_PICTURE.querySelector('.social__comments');

      var pictureComment = document.createElement('li');
      pictureComment.classList.add('social__comment');
      pictureComments.appendChild(pictureComment);

      var pictureCommentImg = document.createElement('img');
      pictureCommentImg.classList.add('social__picture');
      pictureCommentImg.src = 'img/avatar-' + window.getRandomInt(1, 6) + '.svg';
      pictureCommentImg.alt = 'Аватар комментатора фотографии';
      pictureCommentImg.width = 35;
      pictureCommentImg.height = 35;
      pictureComment.appendChild(pictureCommentImg);

      var pictureCommentText = document.createElement('p');
      pictureCommentText.classList.add('social__text');
      pictureCommentText.textContent = data.comments[i];
      pictureComment.appendChild(pictureCommentText);
    }
  };


  // Прячем счетчик комментариев и загрузку новых
  var commentsHidden = function () {
    var social = BIG_PICTURE.querySelector('.social');
    social.querySelector('.social__comment-count').classList.add('visually-hidden');
    social.querySelector('.social__loadmore').classList.add('visually-hidden');
  };


  // Отрисовываем полную версию фотографии с комментариями
  window.renderBigPicture = function (data) {
    var CURRENT = data[0];
    setupBigPicture(CURRENT);
    removeOldComments();
    appendComments(CURRENT);
    commentsHidden();
  };
})();


/**
 * ФУНКЦИИ ВЫСШЕГО ПОРЯДКА
 */

var NUMBER_OF_PHOTO_ELEMENTS = 25; // Количество превью фотографий на главной странице
var PHOTO_ELEMENTS = window.getPhotoElements(NUMBER_OF_PHOTO_ELEMENTS); // Создаем сами элементы

window.renderPictureElement(PHOTO_ELEMENTS);
window.renderBigPicture(PHOTO_ELEMENTS);
