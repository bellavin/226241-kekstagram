// Отрисовка превью на главной странице

/**
 * 1) Создаем DOM элементы
 * 2) Отрисовываeм DOM элементы на странице
 */

'use strict';

(function () {
  var getPictureElement = function (picture) {
    var pictureTemplate = document.querySelector('#picture').content;
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return pictureElement;
  };


  window.renderPicturePreviews = function (pictures) {
    var picturesListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(getPictureElement(pictures[i]));
    }

    picturesListElement.appendChild(fragment);
  };
})();
