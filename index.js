function WebpackPugManifestPlugin (options) {
  this.filter = options.filter;
  this.sort = options.sort;
}

WebpackPugManifestPlugin.prototype.apply = function (compiler) {
  
  var filter = this.filter;
  var sort = this.sort;
  
  compiler.plugin('emit', function (compilation, callback) {
    var assets = [];
    for (var asset in compilation.assets) {
      assets.push(asset);
    }

    if (typeof filter === 'function') {
      assets = assets.filter(filter);
    }
    
    if (typeof sort === 'function') {
      assets.sort(sort);
    }
    
    compilation.assets['pug-manifest.pug'] = {
      source: function () {
        return assets.reduce(function (accumulation, asset) {
          return accumulation + 'script(type="text/javascript" src="' + asset + '")\n';
        }, '');
      },
      size: function () {
        return assets.length;
      }
    };
    callback();
  });
};

module.exports = WebpackPugManifestPlugin;