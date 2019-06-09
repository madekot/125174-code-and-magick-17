'use strict';

var QUANTITY_WIZARDS_MOCK = 4;

var setupElement = document.querySelector('.setup');
setupElement.classList.remove('hidden');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomNumber = function (min, max) {
  var result = min - 0.5 + Math.random() * (max - min + 1);
  result = Math.round(result);
  return result;
};

var getRandomArrayValue = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

var hasRandomBoolean = function () {
  return Boolean(getRandomNumber(0, 1));
};

var getFullName = function (names, secondName) {
  var mixName = function () {
    var firstOrder = getRandomArrayValue(names) + ' ' + getRandomArrayValue(secondName);
    var secondOrder = getRandomArrayValue(secondName) + ' ' + getRandomArrayValue(names);
    return hasRandomBoolean() ? firstOrder : secondOrder;
  };
  return mixName(names, secondName);
};

var createCharacteristicWizard = function (names, secondName, coatColor, eyesColor) {
  return {
    name: getFullName(names, secondName),
    coatColor: getRandomArrayValue(coatColor),
    eyesColor: getRandomArrayValue(eyesColor),
  };
};

var createCharacteristicWizards = function (quantityWizards, names, secondName, coatColor, eyesColor) {
  var result = [];
  for (var i = 0; i < quantityWizards; i++) {
    result[i] = createCharacteristicWizard(names, secondName, coatColor, eyesColor);
  }
  return result;
};

var mockCharacteristicWizards = createCharacteristicWizards(QUANTITY_WIZARDS_MOCK, NAMES, SECOND_NAME, COAT_COLOR, EYES_COLOR);

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
