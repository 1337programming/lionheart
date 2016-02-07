import {Component} from 'angular2/core';

let style = require('!!raw!sass!./page3.scss');

@Component({
  selector: 'page1',
  template: require('./page3.html'),
  styles: [style],
})

export class PageThree {

  constructor() {

  }
}
