'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var social = bigPicture.querySelector('.social');

  var setupBigPicture = function (data) {
    bigPicture.querySelector('.big-picture__img img').src = data.url; // Выбираем аватарку
    bigPicture.querySelector('.likes-count').textContent = data.likes; // Количество лайков
    bigPicture.querySelector('.social__caption').textContent = data.description; // Описание фотографии
  };

  var removeOldComments = function () {
    var pictureComments = social.querySelector('.social__comments');
    var removedComments = social.querySelectorAll('.social__comment');
    for (var i = 0; i < removedComments.length; i++) {
      pictureComments.removeChild(removedComments[i]);
    }
  };

  var appendComments = function (data) {
    var commetntCounter = data.comments.length > 5 ? 5 : data.comments.length;
    for (var i = 0; i < commetntCounter; i++) {
      var pictureComments = social.querySelector('.social__comments');

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

  var commentsHidden = function () {
    social.querySelector('.social__comment-count').classList.add('visually-hidden');
    social.querySelector('.social__loadmore').classList.add('visually-hidden');
  };


  window.renderBigPicture = function (data) {
    setupBigPicture(data);
    removeOldComments();
    appendComments(data);
    commentsHidden();
  };
})();
