'use strict';
(function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESC = 27;

  window.keyboard = {
    isEventEnter: function (evt) {
      return evt.keyCode === KEY_CODE_ENTER;
    },
    isEventEsc: function (evt) {
      return evt.keyCode === KEY_CODE_ESC;
    }
  };
})();
