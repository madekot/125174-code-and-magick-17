'use strict';
(function () {
  var SET_TIMEOUT = 10000;
  var formElement = document.querySelector('.setup-wizard-form');

  var addListenerLoad = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        case 500:
          error = 'Ошибка сервера';
          break;

        default:
          error = 'Статус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });
  };

  var addListenerError = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
  };

  var addListenerTimeOut = function (xhr, onError, setTimeout) {
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = setTimeout;
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    addListenerLoad(xhr, onLoad, onError);
    addListenerError(xhr, onError);
    addListenerTimeOut(xhr, onError, SET_TIMEOUT);

    xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    data.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(data);
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      addListenerLoad(xhr, onLoad, onError);
      addListenerError(xhr, onError);
      addListenerTimeOut(xhr, onError, SET_TIMEOUT);

      xhr.open('POST', 'https://js.dump.academy/code-and-magick');
      xhr.send(formData);
    });
  };

  var dataWizards = [];
  var getDataWizard = function () {
    return dataWizards;
  };

  var onLoad = function (data) {
    dataWizards = data;
    window.dialog.close();
    window.filter.updateWizards(getDataWizard());
  };

  var onSave = function () {
    window.dialog.close();
  };

  var onError = function (message) {
    window.errorPopup.show(message);
  };

  load(onLoad, onError);
  save(formElement, onSave, onError);

  window.backend = {
    data: getDataWizard,
  };
})();
