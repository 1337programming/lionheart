import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';

let style = require('!!raw!sass!./footer.scss');

@Component({
	selector: 'footer',
	template: require('./footer.html'),
	styles: [style]
})

export class Footer {
	http: Http;
	router: Router;
	constructor(http: Http, router: Router) {
		this.http = http;
		this.router = router;
	}
	logout() {
		console.log('logout called!');
		localStorage.removeItem('jwt');
		this.router.navigate(['/Login']);
	}
}
