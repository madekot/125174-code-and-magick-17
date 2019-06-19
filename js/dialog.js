'use strict';
var Z_INDEX_STAR_ELEMENT = 100;

var setupElement = document.querySelector('.setup');
var avatarIconPlayerElement = setupElement.querySelector('.upload'); // ручка перетаскивания

var getStartingCoordinatesMouse = function (mouseEvt) {
  return {
    x: mouseEvt.clientX,
    y: mouseEvt.clientY
  };
};

var getShiftCoordinatesMouse = function (mouseStartCoordinatesX, mouseStartCoordinatesY, mouseMoveEvt) {
  return {
    x: mouseStartCoordinatesX - mouseMoveEvt.clientX,
    y: mouseStartCoordinatesY - mouseMoveEvt.clientY
  };
};

var setOffsetCoordDragElement = function (DragElement, shiftCoordinatesMouseX, shiftCoordinatesMouseY) {
  DragElement.style.left = (DragElement.offsetLeft - shiftCoordinatesMouseX) + 'px';
  DragElement.style.top = (DragElement.offsetTop - shiftCoordinatesMouseY) + 'px';
};

var addDragAndDrop = function (pinElement, DragElement) {
  DragElement = DragElement || pinElement;

  pinElement.addEventListener('mousedown', function (mouseDownEvt) {
    mouseDownEvt.preventDefault();
    var startingCoordinatesMouse = getStartingCoordinatesMouse(mouseDownEvt);
    var isDragged = false;

    var onSetupElementMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();
      isDragged = true;
      var shiftCoordinatesMouse = getShiftCoordinatesMouse(startingCoordinatesMouse.x, startingCoordinatesMouse.y, mouseMoveEvt);
      startingCoordinatesMouse = getStartingCoordinatesMouse(mouseMoveEvt);
      setOffsetCoordDragElement(DragElement, shiftCoordinatesMouse.x, shiftCoordinatesMouse.y);
    };

    var onSetupElementMouseUp = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();
      document.removeEventListener('mousemove', onSetupElementMouseMove);
      document.removeEventListener('mouseup', onSetupElementMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          pinElement.removeEventListener('click', onClickPreventDefault);
        };
        pinElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onSetupElementMouseMove);
    document.addEventListener('mouseup', onSetupElementMouseUp);
  });
};
addDragAndDrop(avatarIconPlayerElement, setupElement);

var startElement = setupElement.querySelector('[alt="Star"]');
startElement.style.position = 'absolute';
startElement.style.zIndex = Z_INDEX_STAR_ELEMENT;
addDragAndDrop(startElement);
