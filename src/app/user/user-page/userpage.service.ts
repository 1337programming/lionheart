import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Subject, BehaviorSubject} from 'rxjs';
import {User} from './user.model';
@Injectable()
export class UserPageService {

  http: Http;

  constructor(http:Http, public _user:User) {
    this.http = http;
    this.retrieveUser();
  }

  private retrieveUser():void {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwt'));
    this.http.get('http://localhost:8080/api/users', {headers})
      .subscribe(data => {
          let body = JSON.parse(data.text());
          this._user = body.map(data => new User(data._id, data.name, data.role, data.provider));
        },
        err => {
          console.log('Error getting ', err);
        });
  }

  get user():User {
    return this._user;
  }

}
