'use strict';
(function () {
  var isWindowFirstOpening = true;
  var startCoordinatesSetupElementPopap;

  var restartPositionPopap = function () {
    if (isWindowFirstOpening) {
      startCoordinatesSetupElementPopap = {
        x: window.dialog.setupElement.offsetTop,
        y: window.dialog.setupElement.offsetLeft
      };
      isWindowFirstOpening = false;
    } else {
      window.dialog.setupElement.style.top = startCoordinatesSetupElementPopap.x + 'px';
      window.dialog.setupElement.style.left = startCoordinatesSetupElementPopap.y + 'px';
    }
  };
  window.resetPositionPlayerSettingsWindow = {
    restartPositionPopap: restartPositionPopap,
  };
})();
