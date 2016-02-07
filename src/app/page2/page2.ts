import {Component} from 'angular2/core';

let style = require('!!raw!sass!./page2.scss');

@Component({
  selector: 'page1',
  template: require('./page2.html'),
  styles: [style],
})

export class PageTwo {

  constructor() {

  }
}
