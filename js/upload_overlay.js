// Попап upload overlay

'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var overlay = document.querySelector('.img-upload__overlay');
  var overlayClose = document.querySelector('#upload-cancel');

  window.popupEvents(overlay, uploadFile, overlayClose, 'change');
})();
