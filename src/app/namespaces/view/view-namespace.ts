import {Component} from 'angular2/core';
import {RouterLink, Router, RouteParams} from 'angular2/router';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http, Headers} from 'angular2/http';
import {Namespace} from '../namespace.model';
import {NamespaceService} from '../namespace.service';

@Component({
  selector: 'view-namespace',
  template: require('./view-namespace.html'),
  directives: [RouterLink]
})

export class ViewNamespace {
  namespace: Namespace;
  constructor(private params: RouteParams, private namespaceService: NamespaceService, http: Http) {
  	this.namespace = namespaceService.currentNamespace;
  	if (!this.namespace) {
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');
	    headers.append('Authorization', localStorage.getItem('jwt'));
	    http.get('http://localhost:8080/namespace/' + params.get('id'), {headers})
	      .subscribe(response => {
	        let data = JSON.parse(response.text());
	        this.namespace = new Namespace(data._id, data.name, data.content, data.users);
	      },
	      err => {
	        console.log('Error getting ', err);
	      });
  	}
  }
}
