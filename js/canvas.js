'use strict';
(function () {
  var renderRect = function (ctx, coordinateX, coordinateY, width, height, backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(coordinateX, coordinateY, width, height);
  };
  var renderText = function (ctx, text, font, coordinateX, coordinateY, color, baseline) {
    ctx.fillStyle = color || 'black';
    ctx.font = font;
    ctx.textBaseline = baseline || 'hanging';
    ctx.fillText(text, coordinateX, coordinateY);
  };
  var renderTextLines = function (ctx, arrTexts, lineHeight, font, baseline, color, coordinateX, startCoordinateY) {
    var coordinateLineY = startCoordinateY || 0;
    for (var i = 0; i < arrTexts.length; i++) {
      var lineText = arrTexts[i];
      renderText(ctx, lineText, font, coordinateX, coordinateLineY += lineHeight, color, baseline);
    }
  };
  window.canvas = {
    rect: renderRect,
    text: renderText,
    textLines: renderTextLines,
  };
})();
