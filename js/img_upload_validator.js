'use strict';

(function () {
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var HASHTAG_NUM = [
    'Первый',
    'Второй',
    'Третий',
    'Четвертый',
    'Пятый'
  ];


  window.imgUploadValidate = function (overlay) {
    var imgUploadText = overlay.querySelector('.img-upload__text');
    var hashtag = imgUploadText.querySelector('.text__hashtags');
    var description = imgUploadText.querySelector('.text__description');


    hashtag.addEventListener('input', function (evt) {
      var hashtags = evt.target.value.split(' ');
      var flag = true;

      if (hashtags.length > 5) {
        hashtag.setCustomValidity('Слишком много хештегов');
        flag = false;
      } else if (!window.testUnique(hashtags)) {
        hashtag.setCustomValidity('Хештеги повторяются');
        flag = false;
      } else {
        for (var i = 0; i < hashtags.length; i++) {
          if (hashtags[i][0] !== '#') {
            hashtag.setCustomValidity(HASHTAG_NUM[i] + ' хештег должен начинатся с символа решетки "#"');
            flag = false;
            break;
          } else if (hashtags[i].length < MIN_HASHTAG_LENGTH) {
            hashtag.setCustomValidity(HASHTAG_NUM[i] + ' хештег должeн состоять минимум из ' + MIN_HASHTAG_LENGTH + '-х символов');
            flag = false;
            break;
          } else if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
            hashtag.setCustomValidity(HASHTAG_NUM[i] + ' хештег слишком длиный. Максимальная длина ' + MAX_HASHTAG_LENGTH + ' символов');
            flag = false;
            break;
          }
        }
      }

      if (flag || hashtags[0] === '') {
        hashtag.setCustomValidity('');
      }
    });


    description.addEventListener('invalid', function () {
      if (description.validity.tooLong) {
        description.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else {
        description.setCustomValidity('');
      }
    });

    window.resetPopupText = function () {
      hashtag.value = '';
      description.value = '';
    };
  };
})();
