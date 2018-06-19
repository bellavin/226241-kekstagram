// Отрисовка окна редактирования загруженного изображения

'use strict';

(function () {
  var overlay = document.querySelector('.img-upload__overlay');
  var overlayPreview = overlay.querySelector('.img-upload__preview'); // класс добавляем сюда
  var effects = overlay.querySelectorAll('.effects__radio');
  var checkedEffect = overlay.querySelector('.effects__radio:checked');

  var scale = document.querySelector('.scale');
  overlayPreview.classList.add('effects__preview--' + checkedEffect.value);

  var addChangeListener = function (effect) {
    effect.addEventListener('click', function () {
      overlayPreview.className = 'img-upload__preview';

      if (effect.value !== 'none') {
        overlayPreview.classList.add('effects__preview--' + effect.value);
        if (scale.classList.contains('hidden')) {
          scale.classList.remove('hidden');
        }
      }

      if (effect.value === 'none') {
        scale.classList.add('hidden');
      }
    });
  };

  for (var i = 0; i < effects.length; i++) {
    var effect = effects[i];
    addChangeListener(effect);
  }
})();
