'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var overlay = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var overlayClose = document.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (!evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.resetPopupSize(); // Передается из img_upload_resize.js
    window.resetPopupFilter(); // Передается из img_upload_filters.js

    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  uploadFile.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  overlayClose.addEventListener('click', function () {
    closePopup();
  });

  overlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
})();
