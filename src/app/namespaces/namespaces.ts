import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {Namespace} from './namespace.model';
import {NamespaceService} from './namespace.service';

let style = require('!!raw!sass!./namespaces.scss');

@Component({
  selector: 'namespaces',
  template: require('./namespaces.html'),
  styles: [style],
  directives: [RouterLink]
})

export class Namespaces {
  user:any;
  links:Array<Namespace>;

  constructor(private router:Router, private http:Http, private namespaceService: NamespaceService) {
    this.links = [];
    this.getUserNamespaces();
  }

  private getUserNamespaces() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwt'));
    this.http.get('http://localhost:8080/namespace/', {headers})
      .subscribe(data => {
        let body = JSON.parse(data.text());
        this.links = body.map(data => new Namespace(data._id, data.name, data.content, data.users));
      },
      err => {
        console.log('Error getting ', err);
      });
  }

  openNamespace(namespace: Namespace) {
    this.namespaceService.currentNamespace = namespace;
    this.router.navigate(['/ViewNamespace', {id: namespace.id}])

    // TODO route to namespace
    return false;
  }

  newNamespace() {
    this.router.navigate(['/NewNamespace']);
  }
}
