'use strict';
(function () {

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

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

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
    xhr.send();
  };

  var formElement = document.querySelector('.setup-wizard-form');
  // formElement.addEventListener('submit', function (evt) {
  //   evt.preventDefault();
  // });

  var save = function (data, onLoad, onError) {
    data.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(data);
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;

          case 400:
            error = 'Неверный запрос';
            onLoad(xhr.response);
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

        xhr.open('POST', 'https://js.dump.academy/code-and-magick');
        xhr.send(formData);
      });
    });
  };

  window.backend = {
    load: load,
    save: save,
  };

  var onError = function (message) {
    console.error(message);
  };

  var onLoad = function (data) {
    console.log(data);
  };

  window.backend.load(onLoad, onError);
  window.backend.save(formElement, onLoad, onError);
})();
