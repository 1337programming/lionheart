import {Component} from 'angular2/core';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http, Headers} from 'angular2/http';
import {RouterLink, Router} from 'angular2/router';
import {UserService} from '../user/user.service';
let style = require('!!raw!sass!./login.scss');

@Component({
  selector: 'home',
  template: require('./login.html'),
  styles: [style],
  directives: [RouterLink],
  providers: [UserService]
})

export class Login {
  loginForm: ControlGroup;

  constructor(fb: FormBuilder, private http: Http, private router: Router, private userService: UserService) {
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  signIn(event) {
	  event.preventDefault();
	  let headers = new Headers();
	  headers.append('Content-Type', 'application/json');
	  let props = this.loginForm.value;
	  let body = JSON.stringify({
		  email: props.email,
		  password: props.password
	  });
	  this.http.post('http://localhost:8080/auth/local/', body, {headers}).subscribe(
	    data => {
			let body = JSON.parse(data.text());
			if (body && body.token) {
				let token = body.token;
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
