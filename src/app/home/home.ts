import {Component} from 'angular2/core';

let style = require('!!raw!sass!./home.scss');

@Component({
  selector: 'home',
  template: require('./home.html'),
  styles: [style],
})



export class Home {

  constructor() {

  }
}

