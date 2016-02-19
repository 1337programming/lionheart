import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class NewsFeedService {
  http: Http;

  constructor(http:Http) {
    this.http = http;
  }

  fetchNewsFeed():Promise<Response> {
    var userId:string = '1234';
    return this.http.get('http://localhost:8080/newsfeed?userId=' + userId).toPromise(); // Todo insert user id
  }

  fetchItem(itemId:string):Promise<Response> {
    return this.http.get('http://localhost:8080/newsfeed?itemId=' + itemId).toPromise();
  }

}
