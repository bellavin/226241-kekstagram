'use strict';

(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }; // Спасибо Кантору за код

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];


  // Генерируем фотографии
  var photos = [];

  for (var i = 0; i < 25; i++) {
    var photosId = i + 1;
    photos.push(
        {
          url: 'photos/' + photosId + '.jpg',
          likes: getRandomInt(15, 200),
          comments: comments[getRandomInt(0, 5)],
          description: descriptions[getRandomInt(0, 5)]
        }
    );
  }


  // Отрисовываем фотографии
  var pictureTemplate = document.querySelector('#picture').content;
  var picturesListElement = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments;

    return pictureElement;
  };

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < photos.length; j++) {
    fragment.appendChild(renderPicture(photos[j]));
  }
  picturesListElement.appendChild(fragment);



  // Увеличенное изображение
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photos[0].url; // Выбираем аватарку
  bigPicture.querySelector('.likes-count').textContent = photos[0].likes; // Количество лайков
  bigPicture.querySelector('.social__caption').textContent = photos[0].description; // Описание фотографии



  // Добавляем комментарий
  var pictureComments = bigPicture.querySelector('.social__comments');
  var pictureComment = document.createElement('li');
  pictureComment.classList.add('social__comment');
  pictureComments.appendChild(pictureComment);

  var pictureCommentImg = document.createElement('img');
  pictureCommentImg.classList.add('social__picture');
  pictureCommentImg.src = 'img/avatar-'+ getRandomInt(1, 6) + '.svg';
  pictureCommentImg.alt = 'Аватар комментатора фотографии';
  pictureCommentImg.width = 35;
  pictureCommentImg.height = 35;
  pictureComment.appendChild(pictureCommentImg);

  var pictureCommentText = document.createElement('p');
  pictureCommentText.classList.add('social__text');
  pictureCommentText.textContent = photos[0].comments;
  pictureComment.appendChild(pictureCommentText);



  // Количество комментариев
  bigPicture.querySelector('.comments-count').textContent = bigPicture.querySelectorAll('.social__comment').length;


  // Прячем счетчик комментариев и загруску новых
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
})();
