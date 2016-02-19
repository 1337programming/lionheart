let style = require('!!raw!sass!./news-feed.scss');

import {Component, View} from 'angular2/core';
import {Response} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NewsFeedService} from './services/news-feed-service';
import {TimeAgo} from './pipes/timeago-pipe';
import {DomainPipe} from './pipes/domain-pipe';
import {NewsFeedItem} from './classes/news-feed-item';

var mockFeed = require('./mock/news-feed.json');

@Component({
  selector: 'news-feed',
  providers: [NewsFeedService],
})
@View({
  template: require('./news-feed.html'),
  styles: [style]
})
export class NewsFeed {

  items:Array<NewsFeedItem>;
  domainPipe:any;
  timeAgo:any;
  newsFeedInstance:NewsFeedService;

  constructor(newsFeedInstance:NewsFeedService) {
    this.domainPipe = DomainPipe;

    // Make accessible in other methods.
    this.newsFeedInstance = newsFeedInstance;

    this.timeAgo = TimeAgo;
    //this.fetchData();
    this.items = [];
    for (var i:number = 0; i < mockFeed.length; i++) { // TODO remove mock
      var item:NewsFeedItem = new NewsFeedItem(mockFeed[i]);
      this.items.push(item);
    }
  }

  fetchData() {
    this.newsFeedInstance.fetchNewsFeed().then((res:Response) => {
      var items:Array<any> = res.json();
      for (var i:number = 0; i < items.length; i++) {
        var item:NewsFeedItem = new NewsFeedItem(items[i]);
        this.items.push(item);
      }
    });
  }

  fetchItem(itemId:string) {
    this.newsFeedInstance.fetchItem(itemId).then((res:Response) => {
      // TODO
      console.log(res);
    });
  }
}