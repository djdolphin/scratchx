(function(ext) {
  var lux = 0;

  window.addEventListener("devicelight", function (event) {
    lux = event.value;
  });

  ext._shutdown = function() {};

  ext._getStatus = function() {
    if (navigator.platform == 'MacIntel' && navigator.userAgent.match(/firefox/i)) return {status: 2, msg: 'Ready'};
    return {status: 1, msg: 'Use Firefox on OS X'};
  };

  ext.ambientLight = function() {
    return lux;
  };

  var descriptor = {
    blocks: [
      ['r', 'ambient light', ambientLight]
    ]
  };

  ScratchExtensions.register('Ambient Light', descriptor, ext);
})({});
