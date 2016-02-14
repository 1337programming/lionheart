import {Component} from 'angular2/core';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http, Headers} from 'angular2/http';
import {Router} from 'angular2/router';

import {} from './node_modules/angular2/forms/'
let style = require('!!raw!sass!./signup.scss');

@Component({
	selector: 'home',
	template: require('./signup.html'),
	styles: [style],
})

export class Signup {
	signupForm: ControlGroup;
	http: Http;
	private router: Router;
	constructor(fb: FormBuilder, http: Http, router: Router) {
		this.http = http;
		this.signupForm = fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
		this.router = router;
	}

	signUp(event) {
		event.preventDefault();

		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		var props = this.signupForm.value;
		var body = JSON.stringify({
			name: props.name,
			email: props.email,
			password: props.password
		});
		this.http.post('http://localhost:8080/api/users/', body, { headers }).subscribe(
			data => {
				let body = JSON.parse(data.text());
				if (body && body.token) {
					let token = body.token;
					localStorage.setItem('jwt', token);
					this.router.navigate(['/Home']);
				}
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}
}
