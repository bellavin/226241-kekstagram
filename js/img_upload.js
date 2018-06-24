'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload');

  var overlay = imgUpload.querySelector('.img-upload__overlay');
  var uploadFile = imgUpload.querySelector('#upload-file');
  var overlayClose = overlay.querySelector('#upload-cancel');

  var overlayPreview = overlay.querySelector('.img-upload__preview');
  var form = imgUpload.querySelector('#upload-select-image');


  var resetValue = function () {
    window.resetPopupSize(); // Передается из img_upload_resize.js
    window.resetPopupFilter(); // Передается из img_upload_filters.js
    window.resetPopupText(); // Передается из img_upload_validator.js
    uploadFile.value = '';
  };


  window.imgUploadValidate(overlay);
  window.imgUploadResize(overlay, overlayPreview);
  window.imgUploadFilter(overlay, overlayPreview);


  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      overlay.classList.add('hidden');
      resetValue();
    });
    evt.preventDefault();
  });

  window.showPopup(overlay, uploadFile, overlayClose, 'change', resetValue);
})();
