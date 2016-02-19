import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

let style = require('!!raw!sass!./namespaces.scss');

@Component({
	selector: 'namespaces',
	template: require('./namespaces.html'),
	styles: [style],
	directives: [RouterLink]
})

export class Namespaces {
	router: Router;

	constructor(router: Router) {
		this.router = router;
	}

	newNamespace() {
		this.router.navigate(['/NewNamespace']);
	}
}
