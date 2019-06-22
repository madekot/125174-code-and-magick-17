'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var QUANTITY_WIZARDS_MOCK = 4;
  var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var getFullName = function (names, secondName) {
    var mixName = function () {
      var firstOrder = window.random.arrayElement(names) + ' ' + window.random.arrayElement(secondName);
      var secondOrder = window.random.arrayElement(secondName) + ' ' + window.random.arrayElement(names);
      return window.random.boolean ? firstOrder : secondOrder;
    };
    return mixName(names, secondName);
  };

  var createCharacteristicWizard = function (names, secondName, coatColor, eyesColor) {
    return {
      name: getFullName(names, secondName),
      coatColor: window.random.arrayElement(coatColor),
      eyesColor: window.random.arrayElement(eyesColor),
    };
  };

  var createCharacteristicWizards = function (quantityWizards, names, secondName, coatColor, eyesColor) {
    var result = [];
    for (var i = 0; i < quantityWizards; i++) {
      result[i] = createCharacteristicWizard(names, secondName, coatColor, eyesColor);
    }
    return result;
  };

  var mockCharacteristicWizards = createCharacteristicWizards(QUANTITY_WIZARDS_MOCK, NAMES, SECOND_NAMES, window.wizardData.color.coat, window.wizardData.color.eyes);

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

  var createWizardElements = function (parrentElement, mockArr) {
    var fragment = document.createDocumentFragment();
    mockArr.forEach(function (wizard) {
      var wizardElement = createWizardElement(templateWizard, wizard.name, wizard.coatColor, wizard.eyesColor);
      fragment.appendChild(wizardElement);
    });
    parrentElement.appendChild(fragment);
  };

  createWizardElements(setupSimilarList, mockCharacteristicWizards);

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');
})();
