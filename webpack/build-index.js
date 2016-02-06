var argv = require('yargs').argv;
var path = require('path');
//Setup build
if (argv.prod) {
  var err = function (err) {
    if (err) throw console.error(err);
  };
  var fs = require('fs-extra');
  var minify = require('html-minifier').minify;

  fs.emptyDir('./dist', function (err) {
    if (err) throw console.error(err);
    fs.readFile(path.join(__dirname + '/../src/index.html'), 'utf8', function (err, data) {
      if (err) throw console.error(err);
      var result = minify(data, {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
      });
      fs.writeFile(path.join(__dirname + '/../dist/index.html'), result, err);
    });
  });
}
