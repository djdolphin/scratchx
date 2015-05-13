(function(ext) {
  var editor = document.getElementById('scratch');

  ext._shutdownn = function() {};

  ext._getStatus = function() {
    return {status: 2, message: 'Ready'};
  };

  ext.rotateEditor = function(degrees) {
    editor.style.transform = editor.style.webkitTransform = 'rotate(' + degrees + 'deg)';
  };

  var descriptor = {
    blocks: [
      [' ', 'rotate editor %n degrees', 'rotateEditor', 180]
    ]
  };

  ScratchExtensions.register('Be Cool', descriptor, ext);
})({});
