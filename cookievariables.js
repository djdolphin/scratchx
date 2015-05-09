(function() {
  if (!localStorage.cookieVars) localStorage.cookieVars = '{}';
  var projectID = Scratch.INIT_DATA ? Scratch.INIT_DATA.PROJECT.model.id : 0,
    cookieVars = JSON.parse(localStorage.cookieVars)[projectID] || {};

  function DescriptorBuilder(descriptor) {
    this.descriptor = descriptor;
  }

  DescriptorBuilder.prototype.addBlock = function(type, label, op, defaultArgs) {
    if (!this.descriptor.blocks) this.descriptor.blocks = [];
    var block = [type, label, op];
    if (defaultArgs instanceof Array) for (var i = 0, l = defaultArgs.length; i < l; i++) block.push(defaultArgs[i]);
    this.descriptor.blocks.push(block);
  };

  DescriptorBuilder.prototype.addButton = function(label, action) {
    if (!this.descriptor.blocks) this.descriptor.blocks = [];
    this.descriptor.blocks.push([null, label, action]);
  };

  DescriptorBuilder.prototype.addSpace = function(height) {
    if (!this.descriptor.blocks) this.descriptor.blocks = [];
    if (height === undefined) height = 1;
    var s = '';
    for (var i = 0; i < height; i++) s += '-';
    this.descriptor.blocks.push([s]);
  };

  DescriptorBuilder.prototype.addMenu = function(name, menu) {
    if (!this.descriptor.menus) this.descriptor.menus = {};
    this.descriptor.menus[name] = menu;
  };

  var extBase = {};

  extBase._shutdown = function() {
    var cookieVarBank = JSON.parse(localStorage.cookieVars);
    cookieVarBank[projectID] = cookieVars;
    localStorage.cookieVars = JSON.stringify(cookieVarBank);
  };

  extBase._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  extBase.makeCookieVar = function() {
    var name = prompt('Variable name:');
    if (name in cookieVars) alert('Cannot add! That name is already in use.')
    else {
      cookieVars[name] = '';
      reloadExtension();
    }
    d.show(editor);
  };

  extBase.deleteCookieVar = function() {
    var name = prompt('Variable name:');
    if (!(name in cookieVars)) alert('Cannot delete! A variable with that name does not exist.')
    else {
      delete cookieVars[name];
      reloadExtension();
    }
  };

  extBase.setCookieVar = function(varName, value) {
    varName = varName.substr(3);
    var shouldReload = !(varName in cookieVars);
    cookieVars[varName] = value;
    if (shouldReload) reloadExtension();
  };

  extBase.changeCookieVar = function(varName, amount) {
    varName = varName.substr(3);
    var shouldReload = !(varName in cookieVars);
    cookieVars[varName] = (Number(cookieVars[varName]) || 0) + amount;
    if (shouldReload) reloadExtension();
  };

  function loadExtension() {
    var ext = Object.create(extBase),
      varNames = Object.keys(cookieVars),
      descriptor = {};
    var db = new DescriptorBuilder(descriptor);
    db.addButton('Make a Cookie Variable', 'makeCookieVar');
    if (varNames.length > 0) {
      var defaultVar = '\ud83c\udf6a ' + varNames[varNames.length - 1],
        varName, escapedVarName;
      db.addButton('Delete a Cookie Variable', 'deleteCookieVar');
      db.addSpace();
      for (var i = 0, l = varNames.length; i < l; i++) {
        varName = varNames[i];
        escapedVarName = varName.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
        db.addBlock('r', '\ud83c\udf6a ' + varName, 'getCookieVar:' + varName);
        ext['getCookieVar:' + varName] = (new Function("return this['" + escapedVarName + "']")).bind(cookieVars);
      }
      db.addSpace();
      db.addBlock(' ', 'set %m.cookieVar to %s', 'setCookieVar', [defaultVar, 0]);
      db.addBlock(' ', 'change %m.cookieVar by %n', 'changeCookieVar', [defaultVar, 1]);
      var cookieVarMenu = [];
      for (i = 0, l = varNames.length; i < l; i++) cookieVarMenu.push('\ud83c\udf6a ' + varNames[i]);
      db.addMenu('cookieVar', cookieVarMenu);
    }
    ScratchExtensions.register('Cookie Variables', descriptor, ext);
  };
  
  function reloadExtension() {
    ScratchExtensions.unregister('Cookie Variables');
    loadExtension();
  }

  loadExtension();
})();
