'use strict';
(function () {
  var POINTS_CLOAK_NUMBER = 2;
  var POINTS_EYES_NUMBER = 1;

  var onError = function (message) {
    window.errorPopap.show(message);
  };

  var dataWizards = [];
  var onLoad = function (data) {
    dataWizards = data;
  };

  var setSimilarityRanks = function (wizards) {
    for (var i = 0; i < wizards.length; i++) {
      var wizard = wizards[i];
      setSimilarityRank(wizard);
    }
    return wizards;
  };

  var getSortRank = function (data) {
    var cloneData = data.slice();
    cloneData.sort(function (a, b) {
      return a.similarityBall < b.similarityBall ? 1 : -1;
    });
    return cloneData;
  };

  var similarList = document.querySelector('.setup-similar-list');
  var clearWizards = function () {
    similarList.innerHTML = '';
  };

  var updateWizards = function (data) {
    var wizards = data || dataWizards;
    clearWizards();
    var similarityBallsWizards = setSimilarityRanks(wizards);
    var sortingData = getSortRank(similarityBallsWizards);
    window.setup.createWizardElements(sortingData);
  };

  var setSimilarityRank = function (wizard) {

    var colorPlayerWizard = window.сhangePlayerColor.getColorPlayerWizard();
    var similarityBall = 0;
    if (wizard.colorCoat === colorPlayerWizard.coat) {
      similarityBall += POINTS_CLOAK_NUMBER;
    }

    if (wizard.colorEyes === colorPlayerWizard.eyes) {
      similarityBall += POINTS_EYES_NUMBER;
    }

    wizard.similarityBall = similarityBall;
    return wizard;
  };

  window.backend.load(onLoad, onError);

  window.filter = {
    updateWizards: updateWizards,
  };
})();
