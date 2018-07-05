'use strict';

(function () {
  var RATIO = 100;
  var MAX_VALUE = 100;
  var MIN_VALUE = 25;
  var STEP = 25;

  window.imgUploadResize = function (overlay, overlayPreview) {
    var resize = overlay.querySelector('.img-upload__resize');
    var plus = resize.querySelector('.resize__control--plus');
    var minus = resize.querySelector('.resize__control--minus');
    var value = resize.querySelector('.resize__control--value');

    var scaleCounter = 100;

    minus.addEventListener('click', function () {
      scaleCounter = scaleCounter > MIN_VALUE ? scaleCounter -= STEP : MIN_VALUE;
      overlayPreview.style.transform = 'scale(' + (scaleCounter / RATIO) + ')';

      value.value = scaleCounter + '%';
    });

    plus.addEventListener('click', function () {
      scaleCounter = scaleCounter < MAX_VALUE ? scaleCounter += STEP : MAX_VALUE;
      overlayPreview.style.transform = 'scale(' + (scaleCounter / RATIO) + ')';

      value.value = scaleCounter + '%';
    });

    window.resetPopupSize = function () {
      overlayPreview.style.transform = 'scale(1)';
      scaleCounter = 100;
      value.value = '100%';
    };
  };
})();

