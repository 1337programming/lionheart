import {Component} from 'angular2/core';

let style = require('!!raw!sass!./page1.scss');

@Component({
  selector: 'page1',
  template: require('./page1.html'),
  styles: [style],
})

export class PageOne {

  constructor() {

  }
}
