import {Component} from 'angular2/core';

let style = require('!!raw!sass!./login.scss');

@Component({
  selector: 'home',
  template: require('./login.html'),
  styles: [style],
})



export class Login {

  constructor() {

  }
}

