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
  window.showPopup(overlay, uploadFile, overlayClose, 'change', resetValue);

  var onSuccessUpload = function () {
    overlay.classList.add('hidden');
    resetValue();
  };

  var onErrorUpload = function () {
    overlay.classList.add('hidden');

    var templatesContainer = document.querySelector('#picture').content;
    var errorMessageTemplate = templatesContainer.querySelector('.img-upload__message--error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessage);
    imgUpload.appendChild(fragment);
    errorMessage.classList.remove('hidden');


    var errorLinks = errorMessage.querySelectorAll('.error__link');
    errorLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        window.location.reload();
      });
    });
  };


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.upload(new FormData(form), onSuccessUpload, onErrorUpload);
  });
})();
