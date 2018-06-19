// Отрисовка увеличенного изображения

'use strict';

(function () {
  var NUMBER_OF_PHOTO_ELEMENTS = 25;
  var photoElements = window.generateData(NUMBER_OF_PHOTO_ELEMENTS);
  window.renderPicturePreviews(photoElements);


  var bigPicture = document.querySelector('.big-picture');
  var previews = document.querySelectorAll('.picture__link');
  var closeBigPicture = document.querySelector('.big-picture__cancel');


  var addClickListener = function (elem, num) {
    elem.addEventListener('click', function () {
      window.renderBigPicture(photoElements[num]);
    });
  };


  for (var i = 0; i < previews.length; i++) {
    addClickListener(previews[i], i);
    window.popupEvents(bigPicture, previews[i], closeBigPicture, 'click');
  }
})();
