import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
const connection = new Firebase('https://hacker-news.firebaseio.com/v0/');

export class NewsFeedService {
  http: Http;

  constructor(http:Http) {
    this.http = http;
  }

  fetchNewsFeed():Array<any> {
    var userId:string = '1234';
    return http.get('http://localhost:8080/newsfeed?userId=' + userId).toPromise(); // Todo insert user id
  }

  fetchItem(itemId:string):any {
    return http.get('http://localhost:8080/newsfeed?itemId=' + itemId).toPromise();
  }

}