import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {NgIf} from 'angular2/common';
import {Router} from 'angular2/router';
import {UserService} from '../user/user.service';

let style = require('!!raw!sass!./footer.scss');

@Component({
	selector: 'footer',
	template: require('./footer.html'),
	styles: [style]
})

export class Footer {
	constructor(private http: Http, private router: Router, private userService: UserService) {
	}
	logout() {
		localStorage.removeItem('jwt');
		this.router.navigate(['/Login']);
	}
}
