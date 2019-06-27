'use strict';

(function () {
  var createPopap = function () {
    var element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.zIndex = 900;
    element.style.left = 250 + 'px';
    element.style.top = 25 + '%';
    element.style.width = 500 + 'px';
    element.style.height = 350 + 'px';
    element.style.backgroundColor = 'white';
    element.style.boxShadow = '10px 10px 0 0 black';

    setTimeout(function () {
      document.body.removeChild(element);
    }, 1700);
    // return document.body.appendChild(element);
    return element;
  };

  var createText = function (textError) {
    var element = document.createElement('h3');
    element.textContent = textError;
    element.style.textAlign = 'center';
    element.style.lineHeight = '350px';
    element.style.margin = 0;
    element.style.fontSize = '20px';
    element.style.color = 'black';
    // popap.appendChild(element);
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
