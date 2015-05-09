(function(ext) {
  ext._shutdownn = function() {};

  ext._getStatus = function() {
    return {status: 2, message: 'Ready'};
  };

  ext.rotate = function(degrees) {
    document.getElementById('scratch').style.transform = 'rotate(' + degrees + 'deg)';
  };

  var descriptor = {
    blocks: [
      [' ', 'rotate %n degrees', 'rotate', 180]
    ]
  };

  ScratchExtensions.register('Be Cool', descriptor, ext);
})({});
