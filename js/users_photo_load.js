'use strict';

(function () {
  window.pictures = [];


  var onSuccessLoad = function (data) {
    window.renderPictureElements(data);
    window.pictures = data;
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
