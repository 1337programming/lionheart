var config:any = {};
let argv = require('yargs').argv;

config.sessionSecret = argv['session-secret'] || 'lionheart';

config.userRoles = ['guest', 'user', 'admin'];

export default config;
