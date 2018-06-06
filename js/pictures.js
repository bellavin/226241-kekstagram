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

  // Генератор случайных чисел
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }; // Спасибо Кантору за код


  // Генератор массива фотографий
  var getPhotosElements = function (numOfElements) {
    numOfElements = numOfElements || 1;
    var photosArr = [];

    for (var i = 0; i < numOfElements; i++) {
      photosArr.push(
          {
            url: 'photos/' + (i + 1) + '.jpg',
            likes: getRandomInt(MIN_LIKES, MAX_LIKES),
            comments: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
            description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)]
          }
      );
    }

    return photosArr;
  };


  // Создаем DOM элементы
  var getPictureElement = function (picture) {
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments;

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


  // Увеличенное изображение
  var setupBigPicture = function () {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = getPhotosElements()[0].url; // Выбираем аватарку
    bigPicture.querySelector('.likes-count').textContent = getPhotosElements()[0].likes; // Количество лайков
    bigPicture.querySelector('.social__caption').textContent = getPhotosElements()[0].description; // Описание фотографии
  };


  // Добавляем комментарий
  var appendComment = function () {
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
  };


  // Счетчик комментариев
  var commentsCounter = function () {
    document.querySelector('.comments-count').textContent = document.querySelectorAll('.social__comment').length;
  };


  // Прячем счетчик комментариев и загрузку новых
  var commentsHidden = function () {
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  renderPictureElement(getPhotosElements(NUMBERS_OF_PHOTO_ELEMENTS));
  setupBigPicture();
  appendComment();
  commentsCounter();
  commentsHidden();
})();
