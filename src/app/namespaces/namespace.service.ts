import {Injectable} from 'angular2/core';
import {Namespace} from './namespace.model';
import {Http, Headers} from 'angular2/http';
import {Subject, BehaviorSubject} from 'rxjs';
import {UserService} from '../user/user.service';

@Injectable()
export class NamespaceService {
	public currentNamespace: Namespace;
	public namespaces: Subject<Array<Namespace>> = new BehaviorSubject<Array<Namespace>>([]);

	constructor(private http: Http, private userService: UserService) {}

	public updateNamespaces(): void {
		this.http.get('http://localhost:8080/namespace/', this.userService.headersObj)
		  .subscribe(data => {
		    let body = JSON.parse(data.text());
		    let updatedNamespaces = body.map(data => new Namespace(data._id, data.name, data.content, data.users));
		    this.namespaces.next(updatedNamespaces);
		  },
		  err => {
		    console.log('Error getting ', err);
		  });
	}

}