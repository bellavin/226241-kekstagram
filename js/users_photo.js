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


  var getBigPicture = function (picture) {
    var bigPicture = document.querySelector('.big-picture');
    var previews = document.querySelectorAll('.picture__link');
    var closeBigPicture = document.querySelector('.big-picture__cancel');

    var addClickListener = function (elem, num) {
      elem.addEventListener('click', function () {
        window.renderBigPicture(picture[num]);
      });
    };

    for (var i = 0; i < previews.length; i++) {
      addClickListener(previews[i], i);
      window.showPopup(bigPicture, previews[i], closeBigPicture, 'click');
    }
  };


  var onSuccessLoad = function (pictures) {
    var picturesListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(getPictureElement(pictures[i]));
    }

    picturesListElement.appendChild(fragment);
    getBigPicture(pictures);
  };

  var onErrorLoad = function () {};


  window.load(onSuccessLoad, onErrorLoad);
})();
