import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

let style = require('!!raw!sass!./namespaces.scss');

@Component({
  selector: 'namespaces',
  template: require('./namespaces.html'),
  styles: [style],
  directives: [RouterLink]
})

export class Namespaces {
  router:Router;
  http:Http;
  user:any;
  links:Array<string>;

  constructor(router:Router, http:Http) {
    this.links = [];
    this.http = http;
    this.router = router;
    this.getUser();
  }

  // TODO: user should be defined globally
  private getUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwt'));
    this.http.get('http://localhost:8080/namespace/', {headers})
      .subscribe(data => {
        let body = JSON.parse(data.text());
        this.links = body;
      },
      err => {
        console.log('Error getting ', err);
      });
  }

  openNamespace() {
    // TODO route to namespace
    return false;
  }

  newNamespace() {
    this.router.navigate(['/NewNamespace']);
  }
}
