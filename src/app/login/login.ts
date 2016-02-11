import {Component, View} from 'angular2/core';
import {Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {LoginService} from './services/login-service';

let style = require('!!raw!sass!./login.scss');

@Component({
  selector: 'login',
  providers:[LoginService]
})
@View({
  template: require('./login.html'),
  styles: [style],
})

export class Login {

  auth: any;
  private loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
    this.publicAuth();
  }

  private login(username, password) {
    this.loginService.privateAuth(username, password).then((res:Response) => {
      this.auth = res.json().data;
    });
  }

  private publicAuth() {
    this.loginService.publicAuth().then((res:Response) => {
      this.auth = res.json().data;
    });
  }
}
