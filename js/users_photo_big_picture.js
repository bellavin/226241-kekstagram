'use strict';

(function () {
  var overlay = document.querySelector('.big-picture');
  var closeOverlay = overlay.querySelector('.big-picture__cancel');
  var social = overlay.querySelector('.social');


  var overlayMethods = {
    setup: function (data) {
      overlay.querySelector('.big-picture__img img').src = data.url;
      overlay.querySelector('.likes-count').textContent = data.likes;
      overlay.querySelector('.social__caption').textContent = data.description;
    },

    removeComments: function () {
      var pictureComments = social.querySelector('.social__comments');
      var removedComments = social.querySelectorAll('.social__comment');
      for (var i = 0; i < removedComments.length; i++) {
        pictureComments.removeChild(removedComments[i]);
      }
    },

    appendComments: function (data) {
      var commentCounter = data.comments.length > 5 ? 5 : data.comments.length;

      data.comments.some(function (comment, index) {
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
        pictureCommentText.textContent = comment;
        pictureComment.appendChild(pictureCommentText);

        return index >= commentCounter - 1;
      });
    },

    commentsHidden: function () {
      social.querySelector('.social__comment-count').classList.add('visually-hidden');
      social.querySelector('.social__loadmore').classList.add('visually-hidden');
    }
  };


  window.getBigPicture = function (picture) {
    var previews = window.picturesContainer.querySelectorAll('.picture__link');

    var addClickListener = function (elem, num) {
      elem.addEventListener('click', function () {
        overlayMethods.setup(picture[num]);
        overlayMethods.removeComments();
        overlayMethods.appendComments(picture[num]);
        overlayMethods.commentsHidden();
      });
    };

    previews.forEach(function (preview, i) {
      addClickListener(preview, i);
      window.showPopup(overlay, preview, closeOverlay, 'click');
    });
  };
})();
