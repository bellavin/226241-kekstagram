'use strict';

(function () {
  var checkFilter = function (preview, effect) {
    preview.className = 'img-upload__preview';
    preview.classList.add('effects__preview--' + effect.value);
  };

  var showHideScale = function (preview, effect, scale) {
    if (effect.value !== 'none') {
      if (scale.classList.contains('hidden')) {
        scale.classList.remove('hidden');
      }
    }
    if (effect.value === 'none') {
      scale.classList.add('hidden');
    }
  };


  window.imgUploadFilter = function (ovrlay, overlayPreview) {
    var effectsContainer = ovrlay.querySelector('.img-upload__effects');
    var effects = effectsContainer.querySelectorAll('.effects__radio');
    var checkedEffect = effectsContainer.querySelector('.effects__radio:checked');
    var scale = ovrlay.querySelector('.img-upload__scale');
    checkFilter(overlayPreview, checkedEffect);
    showHideScale(overlayPreview, checkedEffect, scale);


    var addClickListener = function (effect) {
      effect.addEventListener('click', function () {
        checkFilter(overlayPreview, effect);
        showHideScale(overlayPreview, effect, scale);
      });
    };

    for (var i = 0; i < effects.length; i++) {
      var effect = effects[i];
      addClickListener(effect);
    }


    window.resetPopupFilter = function () {
      checkFilter(overlayPreview, checkedEffect);
      showHideScale(overlayPreview, checkedEffect, scale);
      checkedEffect.checked = true;
    };
  };
})();
