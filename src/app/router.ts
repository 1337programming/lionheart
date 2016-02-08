import {RouteConfig} from 'angular2/router';
import {Home} from './home/home';
<<<<<<< HEAD
import {Login} from './login/login';
=======
import {PageOne} from './page1/page1';
import {PageTwo} from './page2/page2';
import {PageThree} from './page3/page3';
>>>>>>> 6bce65562346253d981ed78e35da8ab06aa769ec

export class Router {
	routes: Array<any>
	constructor() {
		this.routes = [
			{ path: '/home', name: 'Home', component: Home, useAsDefault: true },
			{ path: '/login', name: 'Login', component: Login }
			{ path: '/page-one', name: 'PageOne', component: PageOne},
			{ path: '/page-two', name: 'PageTwo', component: PageTwo},
			{ path: '/page-three', name: 'PageThree', component: PageThree}
		];
	}
}
