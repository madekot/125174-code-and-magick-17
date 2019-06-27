'use strict';
(function () {
  var POPAP_BOX_SHADOW = '10px 10px 0 0 black';
  var POPAP_COLOR = 'white';
  var POPAP_HEIGHT = 350;
  var POPAP_LEFT = 250;
  var POPAP_OZ_INDEX = 900;
  var POPAP_POSITION = 'absolute';
  var POPAP_TIME_CLOSE = 1700;
  var POPAP_TOP = 25;
  var POPAP_WIDTH = 500;
  var TEXT_ALIGN = 'center';
  var TEXT_COLOR = 'black';
  var TEXT_FONT_SIZE = 20;
  var TEXT_LINE_HEIGHT = 350;
  var TEXT_TAG_NAME = 'h3';

  var createPopap = function () {
    var element = document.createElement('div');
    element.style.position = POPAP_POSITION;
    element.style.zIndex = POPAP_OZ_INDEX;
    element.style.left = POPAP_LEFT + 'px';
    element.style.top = POPAP_TOP + '%';
    element.style.width = POPAP_WIDTH + 'px';
    element.style.height = POPAP_HEIGHT + 'px';
    element.style.backgroundColor = POPAP_COLOR;
    element.style.boxShadow = POPAP_BOX_SHADOW;

    setTimeout(function () {
      document.body.removeChild(element);
    }, POPAP_TIME_CLOSE);
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

  var showEror = function (textError) {
    var popap = createPopap();
    var text = createText(textError);
    popap.appendChild(text);
    document.body.appendChild(popap);
  };
  window.errorPopap = {
    show: showEror,
  };
})();
