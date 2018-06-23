'use strict';

(function () {
  var overlay = document.querySelector('.img-upload__overlay');
  var overlayPreview = overlay.querySelector('.img-upload__preview');
  var uploadFile = document.querySelector('#upload-file');
  var overlayClose = document.querySelector('#upload-cancel');

  var resetImgUploadValue = function () {
    window.resetPopupSize(); // Передается из img_upload_resize.js
    window.resetPopupFilter(); // Передается из img_upload_filters.js
    uploadFile.value = '';
  };

  window.imgUploadValidate(overlay);
  window.imgUploadResize(overlay, overlayPreview);
  window.imgUploadFilter(overlay, overlayPreview);
  window.showPopup(overlay, uploadFile, overlayClose, 'change', resetImgUploadValue);
})();
