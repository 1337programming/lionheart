let style = require('!!raw!sass!./news-feed.scss');

import {Component, View} from 'angular2/core';
import {Response} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NewsFeedService} from './services/news-feed-service';
import {timeAgo} from './services/timeago-pipe';
import {DomainPipe} from './services/domain-pipe';
import {NewsFeedItem} from './classes/news-feed-item';

@Component({
  selector: 'news-feed',
  providers: [NewsFeedService],
  directives: [ROUTER_DIRECTIVES]
})
@View({
  template: require('.news-feed.html'),
  styles: [style]
})
export class NewsFeed {

  items:Array<NewsFeedItem>;
  domainPipe:any;
  timeAgo:any;
  newsFeedInstance:NewsFeedService;

  constructor(newsFeedInstance:NewsFeedService) {
    this.domainPipe = DomainPipe.transform;

    // Make accessible in other methods.
    this.newsFeedInstance = newsFeedInstance;

    this.timeAgo = timeAgo;
    fetchData();
  }

  fetchData() {
    this.newsFeedInstance.fetchItems().then((res:Response) => {
      var items:Array<any> = res.json();
      for (var i:number = 0; i < this.items.length; i++) {
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