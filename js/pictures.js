'use strict';

(function () {
  var scale = document.querySelector('.scale');
  var scaleLine = scale.querySelector('.scale__line');
  var scalePin = scaleLine.querySelector('.scale__pin');
  // var scaleLevel = scaleLine.querySelector('.scale__level');


  scalePin.addEventListener('mouseup', function () {
    // console.log(evt.x);
    // console.dir(scale);
  });
})();
