'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserElement = document.querySelector('.upload input[type=file]');
  var previewImageFirstElement = document.querySelector('.setup-user-pic');
  var previewImageSecondElement = document.querySelector('.setup-open-icon');

  var changeSrcElement = function (element, url) {
    element.src = url;
  };

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        changeSrcElement(previewImageFirstElement, reader.result);
        changeSrcElement(previewImageSecondElement, reader.result);
      });

      reader.readAsDataURL(file);
    }

  });
})();
