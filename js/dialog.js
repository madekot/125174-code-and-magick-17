'use strict';
(function () {
  var Z_INDEX_STAR_ELEMENT = 100;

  // Перетаскивает окно настроек персонажа
  var setupElement = document.querySelector('.setup');
  var avatarIconPlayerElement = setupElement.querySelector('.upload'); // ручка перетаскивания

  window.dragAndDrop.add(avatarIconPlayerElement, setupElement);

  // Перетаскивает звузду из инвентаря настроек персонажа
  var startElement = setupElement.querySelector('[alt="Star"]');
  startElement.style.position = 'absolute';
  startElement.style.zIndex = Z_INDEX_STAR_ELEMENT;
  window.dragAndDrop.add(startElement);

  // Открытие/закрытие окна настройки персонажа
  var userNameFieldElement = setupElement.querySelector('.setup-user-name');
  var setupOpenButtonElement = document.querySelector('.setup-open');
  var setupCloseButtonElement = setupElement.querySelector('.setup-close');


  var openSetupElement = function () {
    setupElement.classList.remove('hidden');
    userNameFieldElement.focus();
    document.addEventListener('keydown', onSetupElementKeyDown);
    setupCloseButtonElement.addEventListener('keydown', onSetupCloseButtonElementKeyDown);
    window.ChangePlayerColor.addColorsListeners();
    window.resetPositionPlayerSettingsWindow.restartPositionPopap();
  };

  var closeSetupElement = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onSetupElementKeyDown);
    setupCloseButtonElement.removeEventListener('keydown', onSetupCloseButtonElementKeyDown);
    window.ChangePlayerColor.removeColorsListeners();
  };

  var onSetupElementKeyDown = function (evt) {
    if (window.keyboard.isEventEsc(evt)) {
      if (evt.target !== userNameFieldElement) {
        closeSetupElement();
      }
    }
  };

  setupOpenButtonElement.addEventListener('click', function () {
    openSetupElement();
  });

  setupCloseButtonElement.addEventListener('click', function () {
    closeSetupElement();
  });

  setupOpenButtonElement.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (window.keyboard.isEventEnter(evt)) {
      openSetupElement();
    }
  });

  var onSetupCloseButtonElementKeyDown = function (evt) {
    if (window.keyboard.isEventEnter(evt)) {
      closeSetupElement();
    }
  };

  window.dialog = {
    setupElement: setupElement,
  };
})();
