'use strict';

(function () {
  var QUANTITY_WIZARDS = 4;

  var templateElement = document.querySelector('#similar-wizard-template');
  var templateWizard = templateElement.content.querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');

  var createWizardElement = function (cloneTimplate, name, coatColor, eyesColor) {
    var wizardElement = cloneTimplate.cloneNode(true);
    var nameElement = wizardElement.querySelector('.setup-similar-label');
    var coatColorElement = wizardElement.querySelector('.wizard-coat');
    var eyesColorElement = wizardElement.querySelector('.wizard-eyes');

    nameElement.textContent = name;
    coatColorElement.style.fill = coatColor;
    eyesColorElement.style.fill = eyesColor;
    return wizardElement;
  };

  var createWizardElements = function (dataArr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QUANTITY_WIZARDS; i++) {
      var wizard = window.random.arrayElement(dataArr);
      var wizardElement = createWizardElement(templateWizard, wizard.name, wizard.colorCoat, wizard.colorEyes);
      fragment.appendChild(wizardElement);
    }
    setupSimilarList.appendChild(fragment);
  };

  var onError = function (message) {
    window.errorPopap.show(message);
  };

  var onLoad = function () {
    window.dialog.close();
  };

  window.backend.load(createWizardElements, onError);
  window.backend.load(onLoad, onError);

  var formElement = document.querySelector('.setup-wizard-form');
  window.backend.save(formElement, onLoad, onError);

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');
})();
