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

  var addColorListeners = function () {
    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    wizardFireballColor.addEventListener('click', onWizardFireballColorClick);
  };

  var removeColorsListeners = function () {
    wizardCoat.removeEventListener('click', onWizardCoatClick);
    wizardEyes.removeEventListener('click', onWizardEyesClick);
    wizardFireballColor.removeEventListener('click', onWizardFireballColorClick);
  };

  var coatColor = wizardCoat.style.fill;
  var wizardCoatInputHidden = wizardSetup.querySelector('[name="coat-color"]');
  var onWizardCoatClick = function () {
    coatColor = getCoatColor(window.wizardData.color.coat);
    wizardCoat.style.fill = coatColor;
    wizardCoatInputHidden.value = coatColor;
    window.debounce(function () {
      window.filter.updateWizards();
    });
  };

  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardEyesInputHidden = wizardSetup.querySelector('[name="eyes-color"]');
  var eyesColor = wizardEyesInputHidden.value;
  var onWizardEyesClick = function () {
    eyesColor = getEyesColor(window.wizardData.color.eyes);
    wizardEyes.style.fill = eyesColor;
    wizardEyesInputHidden.value = eyesColor;
    window.debounce(function () {
      window.filter.updateWizards();
    });
  };

  var wizardFireballColor = wizardSetup.querySelector('.setup-fireball-wrap');
  var wizardFireballColorInputHidden = wizardSetup.querySelector('[name="fireball-color"]');
  var onWizardFireballColorClick = function () {
    var color = getEyesColor(window.wizardData.color.fireball);
    wizardFireballColor.style.backgroundColor = color;
    wizardFireballColorInputHidden.value = color;
  };

  var getColorPlayerWizard = function () {
    return {
      coat: coatColor,
      eyes: eyesColor,
    };
  };

  window.сhangePlayerColor = {
    addColorsListeners: addColorListeners,
    getColorPlayerWizard: getColorPlayerWizard,
    removeColorsListeners: removeColorsListeners
  };
})();
