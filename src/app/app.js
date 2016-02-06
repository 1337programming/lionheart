require('es6-shim');
require('es6-promise');
require('../../node_modules/angular2/bundles/angular2-polyfills.js');

require('./boot.ts');

if (module.hot) {
	module.hot.accept();
}
