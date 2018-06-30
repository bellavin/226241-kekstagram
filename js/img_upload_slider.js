'use strict';

(function () {
  var scale = document.querySelector('.img-upload__scale');
  var scaleValue = scale.querySelector('.scale__value');
  var scaleLine = scale.querySelector('.scale__line');
  var scalePin = scale.querySelector('.scale__pin');
  var scaleLevel = scale.querySelector('.scale__level');

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

      window.Filters = {
        chrome: 'grayscale(' + (scaleValue.value / 100) + ')',
        sepia: 'sepia(' + (scaleValue.value / 100) + ')',
        marvin: 'invert(' + scaleValue.value + '%)',
        phobos: 'blur(' + (scaleValue.value / 33.3).toFixed(2) + 'px)',
        heat: 'brightness(' + (scaleValue.value / 33.3).toFixed(2) + ')'
      };

      var overlayPreview = document.querySelector('.img-upload__preview');
      window.changeFilter(overlayPreview, window.Filters);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
