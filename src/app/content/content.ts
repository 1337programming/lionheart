import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';

@Component({
	selector: 'content',
	template: require('./content.html'),
	directives: [RouterLink]
})

export class Content {
	router: Router;

	constructor(router: Router) {
		this.router = router;
	}
}
