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
    numOfElements = numOfElements || 1; // Создаем заданное количество, в противном случае один элемент

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
 * ОтРИСОВКА ПРЕВЬЮ НА ГЛАВНОЙ СТРАНИЦЕ
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
  window.renderPictureElement = function (photos) {
    var picturesListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(getPictureElement(photos[i]));
    }

    picturesListElement.appendChild(fragment);
  };

})();


/**
 * ПРОСМОТР ФОТОГРАФИЙ
 */
(function () {
  var MIN_COMMENTS = 1; // Минимальное количество комментариев
  var MAX_COMMENTS = 2; // Максимальное количество комментариев

  var setupBigPicture = function (element) {
    element.querySelector('.big-picture__img img').src = window.getPhotoElements()[0].url; // Выбираем аватарку
    element.querySelector('.likes-count').textContent = window.getPhotoElements()[0].likes; // Количество лайков
    element.querySelector('.social__caption').textContent = window.getPhotoElements()[0].description; // Описание фотографии
    element.classList.remove('hidden');
  };

  // Удаляем старые комментарии
  var removeOldComments = function (element) {
    var pictureComments = element.querySelector('.social__comments');
    var removedComments = element.querySelectorAll('.social__comment');
    for (var i = 0; i < removedComments.length; i++) {
      pictureComments.removeChild(removedComments[i]);
    }
  };


  // Добавляем комментарий
  var appendComments = function (element, numberOfElements) { // Аргумент - количество комментариев, которые будут вставлены
    for (var i = 0; i < numberOfElements; i++) {
      var pictureComments = element.querySelector('.social__comments');

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
      pictureCommentText.textContent = window.getPhotoElements()[0].comments;
      pictureComment.appendChild(pictureCommentText);
    }
  };


  // Прячем счетчик комментариев и загрузку новых
  var commentsHidden = function (element) {
    var social = element.querySelector('.social');
    social.querySelector('.social__comment-count').classList.add('visually-hidden');
    social.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  window.renderBigPicture = function (element) {
    var numberOfComments = window.getRandomInt(MIN_COMMENTS, MAX_COMMENTS);
    setupBigPicture(element);
    removeOldComments(element);
    appendComments(element, numberOfComments);
    commentsHidden(element);
  };

})();


/**
 * ФУНКЦИИ ВЫСШЕГО ПОРЯДКА
 */

var NUMBER_OF_PHOTO_ELEMENTS = 25; // Количество превью фотографий на главной странице
var PHOTO_ELEMENTS = window.getPhotoElements(NUMBER_OF_PHOTO_ELEMENTS); // Создаем сами элементы
window.renderPictureElement(PHOTO_ELEMENTS);


var BIG_PICTURE = document.querySelector('.big-picture');
window.renderBigPicture(BIG_PICTURE);
