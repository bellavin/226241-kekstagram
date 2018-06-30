'use strict';

(function () {
  var getPictureElement = function (picture) {
    var templatesContainer = document.querySelector('#picture').content;
    var pictureTemplate = templatesContainer.querySelector('.picture__link');
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

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #028dc0;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.paddingTop = '5px';
    node.style.paddingBottom = '5px';
    node.style.color = '#eee';
    node.style.fontSize = '15px';
    node.style.textTransform = 'none';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  window.load(onSuccessLoad, onErrorLoad);
})();
