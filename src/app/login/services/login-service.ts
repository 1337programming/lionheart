import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';

interface Request {
  url: string,
  headers: Headers,
  data: any
}

@Injectable()
export class LoginService {

  http:Http;

  constructor(http:Http) {
    this.http = http;
  }

  publicAuth(): Promise<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var req: Request = {
      url: 'http://www.lionHeartAuthUrl.com/',
      headers: headers,
      data: 'grant_type=password&role=PUBLIC'
    }
    return this.http.post(req.url, req.data, req.headers).toPromise();
  }

  privateAuth(username:string, password:string): Promise<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var req: Request = {
      url: 'http://www.lionHeartAuthUrl.com/',
      headers: headers,
      data: 'grant_type=password&username=' + username + '&password=' + password + '&role=REGISTERED'
    }
    return this.http.post(req.url, req.data, req.headers).toPromise();
  }
}
