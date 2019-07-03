'use strict';
(function () {
  var POPUP_BOX_SHADOW = '10px 10px 0 0 black';
  var POPUP_COLOR = 'white';
  var POPUP_HEIGHT = 350;
  var POPUP_LEFT = 250;
  var POPUP_OZ_INDEX = 900;
  var POPUP_POSITION = 'absolute';
  var POPUP_TIME_CLOSE = 1700;
  var POPUP_TOP = 25;
  var POPUP_WIDTH = 500;
  var TEXT_ALIGN = 'center';
  var TEXT_COLOR = 'black';
  var TEXT_FONT_SIZE = 20;
  var TEXT_LINE_HEIGHT = 350;
  var TEXT_TAG_NAME = 'h3';

  var createPopup = function () {
    var element = document.createElement('div');
    element.style.position = POPUP_POSITION;
    element.style.zIndex = POPUP_OZ_INDEX;
    element.style.left = POPUP_LEFT + 'px';
    element.style.top = POPUP_TOP + '%';
    element.style.width = POPUP_WIDTH + 'px';
    element.style.height = POPUP_HEIGHT + 'px';
    element.style.backgroundColor = POPUP_COLOR;
    element.style.boxShadow = POPUP_BOX_SHADOW;

    setTimeout(function () {
      document.body.removeChild(element);
    }, POPUP_TIME_CLOSE);
    return element;
  };

  var createText = function (textError) {
    var element = document.createElement(TEXT_TAG_NAME);
    element.textContent = textError;
    element.style.textAlign = TEXT_ALIGN;
    element.style.lineHeight = TEXT_LINE_HEIGHT + 'px';
    element.style.margin = 0;
    element.style.fontSize = TEXT_FONT_SIZE + 'px';
    element.style.color = TEXT_COLOR;
    return element;
  };

  var showError = function (textError) {
    var popup = createPopup();
    var text = createText(textError);
    popup.appendChild(text);
    document.body.appendChild(popup);
  };
  window.errorPopup = {
    show: showError,
  };
})();
