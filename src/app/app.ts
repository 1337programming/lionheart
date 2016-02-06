import {Component, Injectable} from 'angular2/core';
import {RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {Router} from './router';

var router = new Router();
let template = require('./app.html');

@Component({
	selector: 'my-app',
	template: template,
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig(router.routes)
export class App {

}
