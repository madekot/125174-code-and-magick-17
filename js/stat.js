'use strict';
(function () {
  var CLOUD_COLOR = 'white';
  var CLOUD_COORDINATE_X = 100;
  var CLOUD_COORDINATE_Y = 10;
  var CLOUD_HEIGHT = 270;
  var CLOUD_LINE_HEIGHT_TEXT = 20;
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var CLOUD_SHADOW_GAP = 10;
  var CLOUD_TITLE_TEXTS = ['Ура вы победили!', 'Список результатов:'];
  var CLOUD_WIDTH = 420;
  var DIAGRAM_HEIGHT = 150;
  var DIAGRAM_ITEM_SHIFT = 50;
  var DIAGRAM_ITEM_START_COORDINATE_X = 85;
  var DIAGRAM_TEXT_PADDING_BOTTOM = 10;
  var DIAGRAM_TEXT_PADDING_TOP = 20;
  var DIAGRAM_WIDTH = 40;
  var DIARGAM_PADDING_TOP = 50;
  var START_COORDINATE_Y = 10;

  var cloudShadowCoordinateX = CLOUD_COORDINATE_X + CLOUD_SHADOW_GAP;
  var cloudShadowCoordinateY = CLOUD_COORDINATE_Y + CLOUD_SHADOW_GAP;
  var textHeight = CLOUD_LINE_HEIGHT_TEXT * CLOUD_TITLE_TEXTS.length;

  var renderCloud = function (ctx, cloudWidth, cloudHeight) {
    window.canvas.rect(ctx, cloudShadowCoordinateX, cloudShadowCoordinateY, cloudWidth, cloudHeight, CLOUD_SHADOW_COLOR);
    window.canvas.rect(ctx, CLOUD_COORDINATE_X, CLOUD_COORDINATE_Y, cloudWidth, cloudHeight, CLOUD_COLOR);
  };

  var renderTextDiagramItem = function (ctx, text, coordinateX, coordinateY, color) {
    return window.canvas.text(ctx, text, undefined, coordinateX, coordinateY, color);
  };

  var modifyBackgroundColor = function (name) {
    var myName = 'Вы';
    var backgroundColor = 'rgba(255, 0, 0, 1)';
    var getRandomDiagramColor = function () {
      var randomColor = window.random.number(0, 100);
      return 'hsl(240, ' + randomColor + '%,' + ' 50%)';
    };
    return name === myName ? backgroundColor : getRandomDiagramColor();
  };

  var getMaxValue = function (arr) {
    var maxValue = arr[0];
    for (var i = 0; i < arr.length; i++) {
      var currentIndex = arr[i];
      if (maxValue > currentIndex) {
        maxValue = currentIndex;
      }
    }
    return maxValue;
  };

  var renderDiagramItem = function (ctx, shiftX, name, time, times) {
    var backgroundColor = 'rgba(255, 0, 0, 1)';
    backgroundColor = modifyBackgroundColor(name);
    var maxTimePlayer = getMaxValue(times);
    var diagramHeight = Math.round((maxTimePlayer / time) * DIAGRAM_HEIGHT);
    var diagramCoordinateX = shiftX + DIAGRAM_ITEM_START_COORDINATE_X + CLOUD_COORDINATE_X;
    var diagramCoordinateY = CLOUD_COORDINATE_Y + DIARGAM_PADDING_TOP + textHeight + (DIAGRAM_HEIGHT - diagramHeight);
    window.canvas.rect(ctx, diagramCoordinateX, diagramCoordinateY, DIAGRAM_WIDTH, diagramHeight, backgroundColor);
    renderTextDiagramItem(ctx, name, diagramCoordinateX, diagramCoordinateY - DIAGRAM_TEXT_PADDING_TOP, backgroundColor);
    renderTextDiagramItem(ctx, Math.round(time), diagramCoordinateX, diagramCoordinateY + DIAGRAM_TEXT_PADDING_BOTTOM + diagramHeight, backgroundColor);
  };

  var renderDiagramItems = function (ctx, names, times) {
    var counterShiftX = 0;
    for (var i = 0; i < names.length; i++) {
      renderDiagramItem(ctx, counterShiftX, names[i], times[i], times);
      counterShiftX += DIAGRAM_WIDTH / 2 + DIAGRAM_ITEM_SHIFT;
    }
  };

  var renderCloudTitle = function (ctx, arrTexts, font, coordinateX, startCoordinateY) {
    return window.canvas.textLines(ctx, arrTexts, CLOUD_LINE_HEIGHT_TEXT, font, undefined, undefined, coordinateX, startCoordinateY);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_WIDTH, CLOUD_HEIGHT);
    renderCloudTitle(ctx, CLOUD_TITLE_TEXTS, '16px PT Mono', CLOUD_WIDTH / 2, START_COORDINATE_Y);
    renderDiagramItems(ctx, names, times);
  };
})();
