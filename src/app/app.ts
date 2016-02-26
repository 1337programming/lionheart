import {Component, Injectable} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {AuthRouterOutlet} from './login/auth-router-outlet.ts'
import {Router} from './router';
import {AppProviders} from './app-providers'
import {Navbar} from './navbar/navbar';
import {Footer} from './footer/footer';
import {enableProdMode} from 'angular2/core';
enableProdMode();
var router = new Router();
let providers = new AppProviders().providers;
let template = require('./app.html');

@Component({
	selector: 'my-app',
	template,
	directives: [AuthRouterOutlet, Navbar, Footer],
	providers
})
@RouteConfig(router.routes)
export class App {

}
