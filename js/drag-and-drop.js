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

  var addDragAndDrop = function (pinElement, DragElement) {
    DragElement = DragElement || pinElement;

    pinElement.addEventListener('mousedown', function (mouseDownEvt) {
      mouseDownEvt.preventDefault();
      var startingCoordinatesMouse = getMouseStartingCoordinates(mouseDownEvt);
      var isDragged = false;

      var onSetupElementMouseMove = function (mouseMoveEvt) {
        mouseMoveEvt.preventDefault();
        isDragged = true;
        var shiftCoordinatesMouse = getMouseShiftCoordinates(startingCoordinatesMouse.x, startingCoordinatesMouse.y, mouseMoveEvt);
        startingCoordinatesMouse = getMouseStartingCoordinates(mouseMoveEvt);
        setDragElementOffsetCoord(DragElement, shiftCoordinatesMouse.x, shiftCoordinatesMouse.y);
      };
      document.addEventListener('mousemove', onSetupElementMouseMove);

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
      document.addEventListener('mouseup', onSetupElementMouseUp);
    });
  };

  window.dragAndDrop = {
    startMouseCoord: getMouseStartingCoordinates,
    shiftMouseCoord: getMouseShiftCoordinates,
    setOffsetCoord: setDragElementOffsetCoord,
    add: addDragAndDrop,
  };
})();
