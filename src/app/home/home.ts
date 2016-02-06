import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

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

