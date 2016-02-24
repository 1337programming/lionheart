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
    this.http.get('http://localhost:8080/api/users/me')
      .subscribe(data => {
        let body = JSON.parse(data.text());
        this.user = body;
        this.getNamespaces(body.namespaces);
      },
        err => {
        console.log('Error getting user: ', err);
      }
    );
  }

  private getNamespaces(names:Array<string>):void {
    for (var i:number = 0; i < names.length; i++) {
      this.http.get('http://localhost:8080/namespace/get-name/' + names[i])
        .subscribe(data => {
          let body = JSON.parse(data.text());
          this.links.push(body);
        },
        err => {
          console.log('Error getting ' + names[i], err);
        }
      )
    }
  }

  openNamespace() {
    // TODO route to namespace
    return false;
  }

  newNamespace() {
    this.router.navigate(['/NewNamespace']);
  }
}
