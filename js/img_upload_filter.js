'use strict';

(function () {
  window.imgUploadFilter = function (ovrlay, overlayPreview) {
    var effectsContainer = ovrlay.querySelector('.img-upload__effects');
    var effects = effectsContainer.querySelectorAll('.effects__radio');
    var checkedEffect = effectsContainer.querySelector('.effects__radio:checked');
    var scale = ovrlay.querySelector('.img-upload__scale');

    overlayPreview.classList.add('effects__preview--' + checkedEffect.value);


    var addClickListener = function (effect) {
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
      addClickListener(effect);
    }

    window.resetPopupFilter = function () {
      overlayPreview.classList.add('effects__preview--' + checkedEffect.value);
      checkedEffect.checked = true;
    };
  };
})();
