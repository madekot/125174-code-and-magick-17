'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 200;
var CLOUD_COLOR = 'white';
var CLOUD_COORDINATE_X = 100;
var CLOUD_COORDINATE_Y = 10;
var CLOUD_LINE_HEIGHT_TEXT = 16;

var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_SHADOW_GAP = 10;
var CLOUD_SHADOW_COORDINATE_X = CLOUD_COORDINATE_X + CLOUD_SHADOW_GAP;
var CLOUD_SHADOW_COORDINATE_Y = CLOUD_COORDINATE_Y + CLOUD_SHADOW_GAP;

var CLOUD_TITLE_TEXTS = ['Ура вы победили!', 'Список результатов:'];

var DIAGRAM_WIDTH = 40;
var DIAGRAM_HEIGHT = 150;
var DIARGAM_PADDING = 15;
var DIAGRAM_ITEM_START_COORDINATE_X = 85;
var DIAGRAM_ITEM_SHIFT = 50;

var renderRect = function (ctx, coordinateX, coordinateY, width, height, backgroundColor) {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(coordinateX, coordinateY, width, height);
};

var renderCloud = function (ctx, cloudWidth, cloudHeight) {
  renderRect(ctx, CLOUD_SHADOW_COORDINATE_X, CLOUD_SHADOW_COORDINATE_Y, cloudWidth, cloudHeight, CLOUD_SHADOW_COLOR);
  renderRect(ctx, CLOUD_COORDINATE_X, CLOUD_COORDINATE_Y, cloudWidth, cloudHeight, CLOUD_COLOR);
};

var getRandomNumber = function (min, max) {
  var result = min - 0.5 + Math.random() * (max - min + 1);
  result = Math.round(result);
  return result;
};

var modifyBackgroundColor = function (name) {
  var myName = 'Вы';
  var backgroundColor = 'rgba(255, 0, 0, 1)';
  var getRandomDiagramColor = function () {
    var randomColor = getRandomNumber(0, 100);
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

// var getDiagramItemHeight = function (times) {
//   var maxTime = getMaxValue(times);
//   var onePixel = DIAGRAM_HEIGHT / maxTime;
// };

var renderDiagramItem = function (ctx, shiftX, name, time, times) {
  var diagramCoordinateX = (shiftX || 0) + DIAGRAM_ITEM_START_COORDINATE_X;
  var diagramCoordinateY = CLOUD_LINE_HEIGHT_TEXT * CLOUD_TITLE_TEXTS.length + DIARGAM_PADDING;
  var backgroundColor = 'rgba(255, 0, 0, 1)';
  backgroundColor = modifyBackgroundColor(name);
  var maxTime = getMaxValue(times);
  var diagramHeight = Math.round((time * DIAGRAM_HEIGHT) / maxTime);
  console.log(diagramHeight)
  console.log(maxTime);
  renderRect(ctx, diagramCoordinateX + CLOUD_COORDINATE_X, diagramCoordinateY + CLOUD_COORDINATE_Y, DIAGRAM_WIDTH, diagramHeight, backgroundColor);
};

var renderDiagramItems = function (ctx, names, times) {
  var counterShiftX = 0;
  for (var i = 0; i < names.length; i++) {
    renderDiagramItem(ctx, counterShiftX, names[i], times[i], times);
    counterShiftX += DIAGRAM_WIDTH / 2 + DIAGRAM_ITEM_SHIFT;
  }
};

var renderText = function (ctx, text, font, coordinateX, coordinateY, color, baseline) {
  ctx.fillStyle = color || 'black';
  ctx.font = font;
  ctx.textBaseline = baseline || 'hanging';
  ctx.fillText(text, coordinateX, coordinateY);
};

var renderTextLines = function (ctx, arrTexts, lineHeight, font, baseline, color, coordinateX, startCoordinateY) {
  var coordinateLineY = startCoordinateY || 0;
  lineHeight = lineHeight || CLOUD_LINE_HEIGHT_TEXT;
  for (var i = 0; i < arrTexts.length; i++) {
    var lineText = arrTexts[i];
    renderText(ctx, lineText, font, coordinateX, coordinateLineY += lineHeight, color, baseline);
  }
};

var renderCloudTitle = function (ctx, arrTexts, font, coordinateX) {
  return renderTextLines(ctx, arrTexts, undefined, font, undefined, undefined, coordinateX);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloudTitle(ctx, CLOUD_TITLE_TEXTS, '16px PT Mono', CLOUD_WIDTH / 2);
  renderDiagramItems(ctx, names, times);
};
