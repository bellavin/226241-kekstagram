// Просмотр фотографий

/**
 * 1)
 * 2)
 * 3)
 * 4)
 */

'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var social = bigPicture.querySelector('.social');

  // var picturePreview = document.querySelector('.picture__link');
  // var closeBigPicture = document.querySelector('.big-picture__cancel');

  // window.popupEvents(bigPicture, picturePreview, closeBigPicture, 'click');
  // console.log(bigPicture, picturePreview, closeBigPicture);


  // Разворачиваем полную версию фотографии с комментариями и описанием
  var setupBigPicture = function (data) {
    bigPicture.querySelector('.big-picture__img img').src = data.url; // Выбираем аватарку
    bigPicture.querySelector('.likes-count').textContent = data.likes; // Количество лайков
    bigPicture.querySelector('.social__caption').textContent = data.description; // Описание фотографии
    bigPicture.classList.remove('hidden');
  };


  // Удаляем старые комментарии
  var removeOldComments = function () {
    var pictureComments = social.querySelector('.social__comments');
    var removedComments = social.querySelectorAll('.social__comment');
    for (var i = 0; i < removedComments.length; i++) {
      pictureComments.removeChild(removedComments[i]);
    }
  };


  // Добавляем комментарии
  var appendComments = function (data) {
    for (var i = 0; i < data.comments.length; i++) {
      var pictureComments = bigPicture.querySelector('.social__comments');

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
    social.querySelector('.social__comment-count').classList.add('visually-hidden');
    social.querySelector('.social__loadmore').classList.add('visually-hidden');
  };

  // Отрисовываем полную версию фотографии с комментариями
  window.renderBigPicture = function (data) {
    setupBigPicture(data);
    removeOldComments();
    appendComments(data);
    commentsHidden();
  };
})();
