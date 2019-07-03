'use strict';
(function () {
  var CLOAK_RATING = 2;
  var EYE_RATING = 1;

  var setSimilarityRank = function (wizard) {

    var colorPlayerWizard = window.сhangePlayerColor.getColorPlayerWizard();
    var similarityBall = 0;
    if (wizard.colorCoat === colorPlayerWizard.coat) {
      similarityBall += CLOAK_RATING;
    }

    if (wizard.colorEyes === colorPlayerWizard.eyes) {
      similarityBall += EYE_RATING;
    }

    wizard.similarityBall = similarityBall;
    return wizard;
  };

  var setSimilarityRanks = function (wizards) {
    wizards.forEach(function (wizard) {
      setSimilarityRank(wizard);
    });
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
    var wizards = data || window.backend.data();
    clearWizards();
    var similarityBallsWizards = setSimilarityRanks(wizards);
    var sortingData = getSortRank(similarityBallsWizards);
    window.setup.createWizardElements(sortingData);
  };

  window.filter = {
    updateWizards: updateWizards,
  };
})();
