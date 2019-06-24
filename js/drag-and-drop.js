'use strict';
(function () {
  var getMouseStartingCoordinates = function (mouseEvt) {
    return {
      x: mouseEvt.clientX,
      y: mouseEvt.clientY
    };
  };

  var getMouseShiftCoordinates = function (mouseStartCoordinatesX, mouseStartCoordinatesY, mouseMoveEvt) {
    return {
      x: mouseStartCoordinatesX - mouseMoveEvt.clientX,
      y: mouseStartCoordinatesY - mouseMoveEvt.clientY
    };
  };

  var setDragElementOffsetCoord = function (DragElement, shiftCoordinatesMouseX, shiftCoordinatesMouseY) {
    DragElement.style.left = (DragElement.offsetLeft - shiftCoordinatesMouseX) + 'px';
    DragElement.style.top = (DragElement.offsetTop - shiftCoordinatesMouseY) + 'px';
  };

  var isDragged = false;

  var onClickPreventDefault = function (pinElement, clickPreventDefault) {
    return function (evt) {
      if (isDragged) {
        evt.preventDefault();
        isDragged = false;
        pinElement.removeEventListener('click', clickPreventDefault);
      }
    };
  };

  var onMouseMove = function (startingCoordinatesMouse, DragElement) {
    return function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();
      var shiftCoordinatesMouse = getMouseShiftCoordinates(startingCoordinatesMouse.x, startingCoordinatesMouse.y, mouseMoveEvt);
      startingCoordinatesMouse = getMouseStartingCoordinates(mouseMoveEvt);
      setDragElementOffsetCoord(DragElement, shiftCoordinatesMouse.x, shiftCoordinatesMouse.y);
      isDragged = true;
    };
  };

  var onMouseUp = function (onElementMouseMove, onElementMouseUp, pinElement) {
    return function (mouseUpEvt) {
      mouseUpEvt.preventDefault();
      document.removeEventListener('mousemove', onElementMouseMove);
      document.removeEventListener('mouseup', onElementMouseUp);
      pinElement.addEventListener('click', onClickPreventDefault(pinElement));
    };
  };

  var onMouseDown = function (DragElement, pinElement) {
    return function (mouseDownEvt) {
      var startingCoordinatesMouse = getMouseStartingCoordinates(mouseDownEvt);
      var elementMouseMove = onMouseMove(startingCoordinatesMouse, DragElement, pinElement);
      document.addEventListener('mousemove', elementMouseMove);
      var elementMouseUp = onMouseUp(elementMouseMove, elementMouseUp, pinElement);
      document.addEventListener('mouseup', onMouseUp(elementMouseMove, elementMouseUp, pinElement));
    };
  };

  var addDragAndDrop = function (pinElement, DragElement) {
    DragElement = DragElement || pinElement;
    pinElement.addEventListener('mousedown', onMouseDown(DragElement, pinElement));
  };

  window.dragAndDrop = {
    add: addDragAndDrop,
  };
})();
