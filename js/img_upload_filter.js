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

  var changeFilter = function (preview, filter) {
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
    if (preview.classList.contains('effects__preview--none')) {
      preview.style.filter = '';
    }
  };


  var Filters = {
    chrome: 'grayscale(1)',
    sepia: 'sepia(1)',
    marvin: 'invert(100%)',
    phobos: 'blur(5px)',
    heat: 'brightness(3)'
  };


  window.imgUploadFilter = function (ovrlay, overlayPreview) {
    var effectsContainer = ovrlay.querySelector('.img-upload__effects');
    var effects = effectsContainer.querySelectorAll('.effects__radio');
    var checkedEffect = effectsContainer.querySelector('.effects__radio:checked');

    var scale = ovrlay.querySelector('.img-upload__scale');
    var scaleValue = scale.querySelector('.scale__value');
    var scaleLine = scale.querySelector('.scale__line');
    var scalePin = scale.querySelector('.scale__pin');
    var scaleLevel = scale.querySelector('.scale__level');


    checkFilter(overlayPreview, checkedEffect);
    showHideScale(overlayPreview, checkedEffect, scale);


    var addClickListener = function (effect) {
      effect.addEventListener('click', function () {
        checkFilter(overlayPreview, effect);
        showHideScale(overlayPreview, effect, scale);
        changeFilter(overlayPreview, Filters);
      });
    };

    for (var i = 0; i < effects.length; i++) {
      var effect = effects[i];
      addClickListener(effect);
    }


    scalePin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoordsX = evt.clientX;
      var shiftX = evt.clientX - startCoordsX;
      var scaleLineCoords = scaleLine.getBoundingClientRect();
      var scaleLineWidth = scaleLineCoords.width;


      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var leftEdge = moveEvt.clientX - shiftX - scaleLineCoords.left;
        if (leftEdge < 0) {
          leftEdge = 0;
        }
        var rightEdge = scaleLine.offsetWidth;
        if (leftEdge > rightEdge) {
          leftEdge = rightEdge;
        }

        scalePin.style.left = leftEdge + 'px';
        scaleLevel.style.width = leftEdge + 'px';

        var scaleRatio = leftEdge / scaleLineWidth;

        scaleValue.value = parseInt(scaleRatio * 100, 10);

        Filters = {
          chrome: 'grayscale(' + (scaleValue.value / 100) + ')',
          sepia: 'sepia(' + (scaleValue.value / 100) + ')',
          marvin: 'invert(' + scaleValue.value + '%)',
          phobos: 'blur(' + (scaleValue.value / 20) + 'px)',
          heat: 'brightness(' + (scaleValue.value / 33.3).toFixed(2) + ')'
        };

        var overlayPreview = document.querySelector('.img-upload__preview');
        changeFilter(overlayPreview, Filters);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });


    window.resetPopupFilter = function () {
      checkFilter(overlayPreview, checkedEffect);
      showHideScale(overlayPreview, checkedEffect, scale);
      checkedEffect.checked = true;
      overlayPreview.style.filter = '';
      scalePin.style.left = '100%';
      scaleLevel.style.width = '100%';
    };
  };
})();
