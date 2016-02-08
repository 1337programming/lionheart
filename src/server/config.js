var config = module.exports = {};
var argv = require('yargs').argv;

config.sessionSecret = argv['session-secret'] || 'lionheart';

config.userRoles = ['guest', 'user', 'admin'];
