(function(ext) {
  ext._shutdownn = function() {};

  ext._getStatus = function() {
    return {status: 2, message: 'Ready'};
  };

  ext.beCool = function() {
    document.getElementById('scratch').style.transform = 'rotate(180deg)';
  };

  ext.beUncool = function() {
    document.getElementById('scratch').style.transform = 'rotate(0deg)';
  }

  var descriptor = {
    blocks: [
      [' ', 'be cool', 'beCool'],
      [' ', 'be uncool', 'beUncool']
    ]
  };

  ScratchExtensions.register('Be cool', descriptor, ext);
})({});
