'use strict';

(function () {
  var overlayPreview = document.querySelector('.img-upload__preview');
  var effects = document.querySelectorAll('.effects__radio');
  var checkedEffect = document.querySelector('.effects__radio:checked');

  overlayPreview.classList.add('effects__preview--' + checkedEffect.value);


  var addChangeListener = function (effect) {
    effect.addEventListener('click', function () {
      overlayPreview.className = 'img-upload__preview';
      overlayPreview.classList.add('effects__preview--' + effect.value);
    });
  };


  for (var i = 0; i < effects.length; i++) {
    var effect = effects[i];
    addChangeListener(effect);
  }

  window.resetPopupFilter = function () {
    overlayPreview.classList.add('effects__preview--' + checkedEffect.value);
  };
})();
