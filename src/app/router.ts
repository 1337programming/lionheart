import {RouteConfig} from 'angular2/router';
import {Home} from './home/home';
import {Login} from './login/login';

export class Router {
	routes: Array<any>
	constructor() {
		this.routes = [
			{ path: '/home', name: 'Home', component: Home, useAsDefault: true },
			{ path: '/login', name: 'Login', component: Login }
		];
	}
}