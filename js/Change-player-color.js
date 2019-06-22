'use strict';
(function () {
  // Изменение цвета персонажа;
  var wizardSetup = document.querySelector('.setup-player');

  var getCoatColor = function (CoatColor) {
    return window.random.arrayElement(CoatColor);
  };

  var getEyesColor = function (CoatColor) {
    return window.random.arrayElement(CoatColor);
  };

  var wizardCoat = wizardSetup.querySelector('.wizard-coat');

  var addColorsListeners = function () {
    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireballColor.addEventListener('click', onWizardFireballColorClick);
  };

  var removeColorsListeners = function () {
    wizardCoat.removeEventListener('click', onWizardCoatClick);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardFireballColor.removeEventListener('click', onWizardFireballColorClick);
  };

  var wizardCoatInputHidden = wizardSetup.querySelector('[name="coat-color"]');
  var onWizardCoatClick = function () {
    var color = getCoatColor(window.wizardData.color.coat);
    wizardCoat.style.fill = color;
    wizardCoatInputHidden.value = color;
  };

  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardEyesInputHidden = wizardSetup.querySelector('[name="eyes-color"]');
  var onWizardEyesClick = function () {
    var color = getEyesColor(window.wizardData.color.eyes);
    wizardEyes.style.fill = color;
    wizardEyesInputHidden.value = color;
  };

  var wizardFireballColor = wizardSetup.querySelector('.setup-fireball-wrap');
  var wizardFireballColorInputHidden = wizardSetup.querySelector('[name="fireball-color"]');
  var onWizardFireballColorClick = function () {
    var color = getEyesColor(window.wizardData.color.fireball);
    wizardFireballColor.style.backgroundColor = color;
    wizardFireballColorInputHidden.value = color;
  };

  window.ChangePlayerColor = {
    addColorsListeners: addColorsListeners,
    removeColorsListeners: removeColorsListeners
  };
})();
