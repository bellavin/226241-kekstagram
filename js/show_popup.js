'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.showPopup = function (popup, openBtn, closeBtn, eventName, callback) {
    var onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        if (evt.target.name !== 'hashtags' && evt.target.name !== 'description') {
          closePopup();
        }
      }
    };

    var closePopup = function () {
      popup.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      if (callback) {
        callback();
      }
    };

    var openPopup = function () {
      popup.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };


    openBtn.addEventListener(eventName, function () {
      openPopup();
    });

    openBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openPopup();
      }
    });

    closeBtn.addEventListener('click', function () {
      closePopup();
    });

    closeBtn.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
      }
    });
  };
})();
