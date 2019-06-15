'use strict';

var QUANTITY_WIZARDS_MOCK = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var KEY_CODE_ENTER = 13;
var KEY_CODE_ESC = 27;

var setupElement = document.querySelector('.setup');

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

var mockCharacteristicWizards = createCharacteristicWizards(QUANTITY_WIZARDS_MOCK, NAMES, SECOND_NAMES, COAT_COLORS, EYES_COLORS);

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

// Открытие/закрытие окна настройки персонажа
var userNameFieldElement = setupElement.querySelector('.setup-user-name');
var setupOpenButtonElement = document.querySelector('.setup-open');
var setupCloseButtonElement = setupElement.querySelector('.setup-close');

var openSetupElement = function () {
  setupElement.classList.remove('hidden');
  userNameFieldElement.focus();
  document.addEventListener('keydown', onSetupElementKeyDown);
  setupCloseButtonElement.addEventListener('keydown', onSetupCloseButtonElementKeyDown);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardFireballColor.addEventListener('click', onWizardFireballColorClick);
};

var closeSetupElement = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onSetupElementKeyDown);
  setupCloseButtonElement.removeEventListener('keydown', onSetupCloseButtonElementKeyDown);
  wizardCoat.removeEventListener('click', onWizardCoatClick);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  wizardFireballColor.removeEventListener('click', onWizardFireballColorClick);
};

var onSetupElementKeyDown = function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
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
  if (evt.keyCode === KEY_CODE_ENTER) {
    openSetupElement();
  }
});

var onSetupCloseButtonElementKeyDown = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    closeSetupElement();
  }
};

// Изменение цвета персонажа;
var wizardSetup = setupElement.querySelector('.setup-player');

var getCoatColor = function (CoatColor) {
  return getRandomArrayValue(CoatColor);
};

var getEyesColor = function (CoatColor) {
  return getRandomArrayValue(CoatColor);
};

var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardCoatInputHidden = wizardSetup.querySelector('[name="coat-color"]');
var onWizardCoatClick = function () {
  var color = getCoatColor(COAT_COLORS);
  wizardCoat.style.fill = color;
  wizardCoatInputHidden.value = color;
};

var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardEyesInputHidden = wizardSetup.querySelector('[name="eyes-color"]');
var onWizardEyesClick = function () {
  var color = getEyesColor(EYES_COLORS);
  wizardEyes.style.fill = color;
  wizardEyesInputHidden.value = color;
};

var wizardFireballColor = wizardSetup.querySelector('.setup-fireball-wrap');
var wizardFireballColorInputHidden = wizardSetup.querySelector('[name="fireball-color"]');
var onWizardFireballColorClick = function () {
  var color = getEyesColor(FIREBALL_COLORS);
  wizardFireballColor.style.backgroundColor = color;
  wizardFireballColorInputHidden.value = color;
};
