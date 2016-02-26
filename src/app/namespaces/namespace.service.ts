import {Injectable} from 'angular2/core';
import {Namespace} from './namespace.model';

@Injectable()
export class NamespaceService {
	public currentNamespace: Namespace;
}