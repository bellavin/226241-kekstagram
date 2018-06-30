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
      preview.style.filter = '';
    }
  };

  window.changeFilter = function (preview, filter) {
    if (preview.classList.contains('effects__preview--chrome')) {
      preview.style.filter = filter.chrome;
    }
    if (preview.classList.contains('effects__preview--sepia')) {
      preview.style.filter = filter.sepia;
    }
    if (preview.classList.contains('effects__preview--marvin')) {
      preview.style.filter = filter.marvin;
    }
    if (preview.classList.contains('effects__preview--phobos')) {
      preview.style.filter = filter.phobos;
    }
    if (preview.classList.contains('effects__preview--heat')) {
      preview.style.filter = filter.heat;
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
        window.changeFilter(overlayPreview, window.Filters);
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
