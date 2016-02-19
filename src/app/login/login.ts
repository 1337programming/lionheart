import {Component} from 'angular2/core';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http, Headers} from 'angular2/http';
import {RouterLink, Router} from 'angular2/router';

let style = require('!!raw!sass!./login.scss');

@Component({
  selector: 'login',
  providers:[LoginService]
})
@View({
  template: require('./login.html'),
  styles: [style],
  directives: [RouterLink]
})

export class Login {
  loginForm: ControlGroup;
  http: Http;
  private router: Router;

  constructor(fb: FormBuilder, http: Http, router: Router) {
	this.http = http;
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.router = router;
  }

  signIn(event) {
	  event.preventDefault();

	  var headers = new Headers();
	  headers.append('Content-Type', 'application/json');
	  var props = this.loginForm.value;
	  var body = JSON.stringify({
		  email: props.email,
		  password: props.password
	  });
	  this.http.post('http://localhost:8080/auth/local/', body, {headers}).subscribe(
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
