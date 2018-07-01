'use strict';

(function () {
  window.picturesContainer = document.querySelector('.pictures.container');


  var templatesContainer = document.querySelector('#picture').content;
  var pictureTemplate = templatesContainer.querySelector('.picture__link');


  var getPictureElement = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return pictureElement;
  };


  window.renderPictureElements = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (elem) {
      fragment.appendChild(getPictureElement(elem));
    });

    window.picturesContainer.appendChild(fragment);
    window.getBigPicture(data);
  };
})();
