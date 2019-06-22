'use strict';
(function () {
  var getPositionCoordinatesElement = function (element) {
    return {
      x: element.offsetTop,
      y: element.offsetLeft
    };
  };

  var isFirstWindowOpening = true;
  var startCoordinatesSetupElementPopap;

  var restartPositionPopap = function () {
    if (isFirstWindowOpening) {
      startCoordinatesSetupElementPopap = getPositionCoordinatesElement(window.dialog.setupElement);
      isFirstWindowOpening = false;
    } else {
      window.dialog.setupElement.style.top = startCoordinatesSetupElementPopap.x + 'px';
      window.dialog.setupElement.style.left = startCoordinatesSetupElementPopap.y + 'px';
    }
  };
  window.resetPositionPlayerSettingsWindow = {
    restartPositionPopap: restartPositionPopap,
  };
})();
