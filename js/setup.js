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

  var createWizardElements = function (dataArr, quantityWizards) {
    var quantity = quantityWizards || QUANTITY_WIZARDS;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity; i++) {
      var wizard = dataArr[i];
      var wizardElement = createWizardElement(templateWizard, wizard.name, wizard.colorCoat, wizard.colorEyes);
      fragment.appendChild(wizardElement);
    }
    setupSimilarList.appendChild(fragment);
  };

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  window.setup = {
    createWizardElements: createWizardElements,
  };
})();
