'use strict';
(function () {
  var Z_INDEX_STAR_ELEMENT = 100;

  var setupElement = document.querySelector('.setup');
  var avatarIconPlayerElement = setupElement.querySelector('.upload'); // ручка перетаскивания

  window.dragAndDrop.add(avatarIconPlayerElement, setupElement);

  var startElement = setupElement.querySelector('[alt="Star"]');
  startElement.style.position = 'absolute';
  startElement.style.zIndex = Z_INDEX_STAR_ELEMENT;
  window.dragAndDrop.add(startElement);

  var userNameFieldElement = setupElement.querySelector('.setup-user-name');
  var setupOpenButtonElement = document.querySelector('.setup-open');
  var setupCloseButtonElement = setupElement.querySelector('.setup-close');

  setupOpenButtonElement.addEventListener('click', function () {
    openSetupElement();
  });

  setupOpenButtonElement.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (window.keyboard.isEnterPressed(evt)) {
      openSetupElement();
    }
  });

  var openSetupElement = function () {
    setupElement.classList.remove('hidden');
    userNameFieldElement.focus();
    document.addEventListener('keydown', onSetupElementKeyDown);
    setupCloseButtonElement.addEventListener('keydown', onSetupCloseButtonElementKeyDown);
    window.сhangePlayerColor.addColorsListeners();
    window.resetPositionPlayerSettingsWindow.restartPositionPopap();
  };

  setupCloseButtonElement.addEventListener('click', function () {
    closeSetupElement();
  });

  var onSetupCloseButtonElementKeyDown = function (evt) {
    if (window.keyboard.isEnterPressed(evt)) {
      closeSetupElement();
    }
  };

  var closeSetupElement = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onSetupElementKeyDown);
    setupCloseButtonElement.removeEventListener('keydown', onSetupCloseButtonElementKeyDown);
    window.сhangePlayerColor.removeColorsListeners();
  };

  var onSetupElementKeyDown = function (evt) {
    if (window.keyboard.isEscPressed(evt)) {
      if (evt.target !== userNameFieldElement) {
        closeSetupElement();
      }
    }
  };

  window.dialog = {
    setupElement: setupElement,
    close: closeSetupElement,
  };
})();
