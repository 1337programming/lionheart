import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {NewsFeed} from '../components/news-feed/news-feed-component';
let style = require('!!raw!sass!./home.scss');

@Component({
  selector: 'home',
  template: require('./home.html'),
  styles: [style],
  directives: [RouterLink, NewsFeed]
})

export class Home {

  constructor() {

  }
}
