import {Component, Injectable} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {AuthRouterOutlet} from './login/auth-router-outlet.ts'
import {Router} from './router';

var router = new Router();
let template = require('./app.html');

@Component({
	selector: 'my-app',
	template: template,
	directives: [AuthRouterOutlet]
})
@RouteConfig(router.routes)
export class App {

}
