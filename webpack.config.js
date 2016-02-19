var config = module.exports = {};
var webpack = require('webpack');
var path = require('path');
var argv = require('yargs').argv;

config.plugins = [];
config.plugins.push(new webpack.HotModuleReplacementPlugin());
var dest;
if (argv.prod) {
    dest = path.join(__dirname, 'dist');
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: true,
        output: {
            comments: false
        }
    }));
} else {
    dest = path.join(__dirname, '.tmp');
}

config.debug = !!argv.debug;
config.context = __dirname;

config.devServer = {
    historyApiFallback: true,
    port: 9000,
    contentBase: path.join('./src/')
};

config.entry = {
    app: path.join('./src/app/app.js'),
    head: path.join('./src/app/head.js')
};

config.output = {
    path: dest,
    filename: '[name].js'
};

config.resolve = {
	alias: {
		'es6-shim': path.join(__dirname, '/node_modules/es6-shim/es6-shim.js')
	},
	root: __dirname,
    extensions: ['', '.ts', '.tsx', '.js', '.json', '.html']
};

config.resolveLoader = {
  root: path.join(__dirname, 'node_modules')
};

config.module = {};
config.module.loaders = require('./webpack/loaders');

require('./webpack/build-index');