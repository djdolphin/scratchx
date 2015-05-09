(function(ext) {
  ext._shutdownn = function() {};

  ext._getStatus = function() {
    return {status: 2, message: 'Ready'};
  };

  ext.beCool = function() {
    document.getElementById('scratch').style.transform = 'rotate(180deg)';
  };

  var descriptor = {
    blocks: [
      [' ', 'be cool', 'beCool']
    ]
  };

  ScratchExtensions.register('Be cool', descriptor, ext);
})({});
