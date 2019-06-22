'use strict';
(function () {
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

  window.dragAndDrop = {
    startMouseCoord: getStartingCoordinatesMouse,
    shiftMouseCoord: getShiftCoordinatesMouse,
    setOffsetCoord: setOffsetCoordDragElement,
    add: addDragAndDrop,
  };
})();
