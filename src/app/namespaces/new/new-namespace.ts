import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
	selector: 'new-namespace',
	template: require('./new-namespace.html'),
	directives: [RouterLink]
})

export class NewNamespace {

	constructor() {
	}
}
