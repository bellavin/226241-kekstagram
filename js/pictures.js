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

  var NUMBERS_OF_PHOTO_ELEMENTS = 25;

  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 2;


  // Рандомайзеры
  // Генератор случайных чисел
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  // Перетряхиваем массив
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = getRandomInt(0, i);
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // Генератор комментариев
  var getRandomCommentsArray = function (array) {
    return array.slice(0, getRandomInt(MIN_COMMENTS, MAX_COMMENTS));
  };


  // Фотографии на главной странице
  // Генератор массива фотографий
  var getPhotosElements = function (numOfElements) {
    numOfElements = numOfElements || 1;
    var photosArray = [];

    for (var i = 0; i < numOfElements; i++) {
      photosArray[i] =
        {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: getRandomInt(MIN_LIKES, MAX_LIKES),
          comments: getRandomCommentsArray(shuffleArray(COMMENTS)),
          description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)]
        };
    }

    return photosArray;
  };


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
  var renderPictureElement = function (photos) {
    var picturesListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < photos.length; j++) {
      fragment.appendChild(getPictureElement(photos[j]));
    }

    picturesListElement.appendChild(fragment);
  };


  // Просмотр фотографий
  // Увеличенное изображение
  var setupBigPicture = function () {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = getPhotosElements()[0].url; // Выбираем аватарку
    bigPicture.querySelector('.likes-count').textContent = getPhotosElements()[0].likes; // Количество лайков
    bigPicture.querySelector('.social__caption').textContent = getPhotosElements()[0].description; // Описание фотографии
  };


  // Добавляем комментарий
  var appendComment = function (numberOfElements) { // Аргумент - количество комментариев, которые будут вставлены
    for (var i = 0; i < numberOfElements; i++) {
      var pictureComments = document.querySelector('.social__comments');
      var pictureComment = document.createElement('li');
      pictureComment.classList.add('social__comment');
      pictureComments.appendChild(pictureComment);

      var pictureCommentImg = document.createElement('img');
      pictureCommentImg.classList.add('social__picture');
      pictureCommentImg.src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
      pictureCommentImg.alt = 'Аватар комментатора фотографии';
      pictureCommentImg.width = 35;
      pictureCommentImg.height = 35;
      pictureComment.appendChild(pictureCommentImg);

      var pictureCommentText = document.createElement('p');
      pictureCommentText.classList.add('social__text');
      pictureCommentText.textContent = getPhotosElements()[0].comments;
      pictureComment.appendChild(pictureCommentText);
    }
  };


  // Прячем счетчик комментариев и загрузку новых
  var commentsHidden = function () {
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  var renderBigPicture = function () { // Типо функция высшего порядка
    setupBigPicture();
    appendComment(getRandomInt(MIN_COMMENTS, MAX_COMMENTS));
    commentsHidden();
  };

  renderPictureElement(getPhotosElements(NUMBERS_OF_PHOTO_ELEMENTS));
  renderBigPicture();

})();
