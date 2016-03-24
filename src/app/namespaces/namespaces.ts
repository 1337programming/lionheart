import {Component, OnInit} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Namespace} from './namespace.model';
import {NamespaceService} from './namespace.service';

let style = require('!!raw!sass!./namespaces.scss');

@Component({
  selector: 'namespaces',
  template: require('./namespaces.html'),
  styles: [style],
  directives: [RouterLink]
})

export class Namespaces implements OnInit {
  user:any;

  constructor(private router:Router, private namespaceService: NamespaceService) {}

  openNamespace(namespace: Namespace) {
    this.namespaceService.currentNamespace = namespace;
    this.router.navigate(['/ViewNamespace', {id: namespace.id}])

    // TODO route to namespace
    return false;
  }

  ngOnInit() {
    this.namespaceService.updateNamespaces();
  }

  newNamespace() {
    this.router.navigate(['/NewNamespace']);
  }
}
