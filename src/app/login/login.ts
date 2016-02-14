import {Component} from 'angular2/core';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http, Headers} from 'angular2/http';
import {RouterLink} from 'angular2/router';

import {} from './node_modules/angular2/forms/'
let style = require('!!raw!sass!./login.scss');

@Component({
  selector: 'home',
  template: require('./login.html'),
  styles: [style],
  directives: [RouterLink]
})

export class Login {
  loginForm: ControlGroup;
  http: Http;;
  constructor(fb: FormBuilder, http: Http) {
	this.http = http;
    this.loginForm = fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
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
			console.log('Got data response: ', data);
	    },
	    err => {
			console.log('Error: ', err);
	    },
	    () => {
			console.log('Authentication Complete');
	    }
	  );
  }
}
