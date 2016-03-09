import {Component} from 'angular2/core';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http} from 'angular2/http';
import {Router} from 'angular2/router';
import {UserService} from '../user/user.service';
import {} from './node_modules/angular2/forms/'
let style = require('!!raw!sass!./signup.scss');

@Component({
	selector: 'home',
	template: require('./signup.html'),
	styles: [style],
	providers: [UserService]
})

export class Signup {
	signupForm: ControlGroup;
	constructor(fb: FormBuilder, private http: Http, private router: Router, private userService: UserService) {
		this.signupForm = fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	signUp(event) {
		event.preventDefault();
		var props = this.signupForm.value;
		var body = JSON.stringify({
			name: props.name,
			email: props.email,
			password: props.password
		});
		this.http.post('http://localhost:8080/api/users/', body, this.userService.headersObj).subscribe(
			data => {
				let body = JSON.parse(data.text());
				if (body && body.token) {
					let token = 'Bearer' + body.token;
					localStorage.setItem('jwt', token);
					this.userService.updateLoggedInStatus();
					this.router.navigate(['/Home']);
				}
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}
}
