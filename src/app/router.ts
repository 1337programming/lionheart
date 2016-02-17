import {RouteConfig} from 'angular2/router';
import {Home} from './home/home';
import {Login} from './login/login';
import {Signup} from './signup/signup';
import {Namespaces} from './namespaces/namespaces';

export class Router {
	routes: Array<any>
	constructor() {
		this.routes = [
			//Default Route
			{ path: '/home', name: 'Home', component: Home, useAsDefault: true },

			//Public Routes
			{ path: '/login', name: 'Login', component: Login },
			{ path: '/signup', name: 'Signup', component: Signup },

			//Private Routes
			{ path: '/namespaces', name: 'Namespaces', component: Namespaces }
		];
	}
}
