import {RouteConfig} from 'angular2/router';
import {Home} from './home/home';
import {Login} from './login/login';
import {Signup} from './signup/signup';

//Namespace
import {Namespaces} from './namespaces/namespaces';
import {NewNamespace} from './namespaces/new/new-namespace';
import {ViewNamespace} from './namespaces/view/view-namespace';
//Content
import {Content} from './content/content';

export class Router {
	routes: Array<any>;
	constructor() {
		this.routes = [
			//Default Route
			{ path: '/home', name: 'Home', component: Home, useAsDefault: true },

			//Public Routes
			{ path: '/login', name: 'Login', component: Login },
			{ path: '/signup', name: 'Signup', component: Signup },

			//Private Routes

			//Namespaces
			{ path: '/namespaces', name: 'Namespaces', component: Namespaces },
			{ path: '/namespaces/new', name: 'NewNamespace', component: NewNamespace },
			{ path: '/namespaces/:id', name: 'ViewNamespace', component: ViewNamespace },
			//Content
			{ path: '/content', name: 'Content', component: Content}
		];
	}
}
