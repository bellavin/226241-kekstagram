// Открытие и закрытие попапов

/**
 * 1)
 * 2)
 */

'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.popupEvents = function (popup, openBtn, closeBtn, eventName) {
    var onPopupEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    };

    var openPopup = function () {
      popup.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };

    var closePopup = function () {
      popup.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
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
