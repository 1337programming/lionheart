import {NamespaceService} from './namespaces/namespace.service';
import {UserService} from './user/user.service';

export class AppProviders {
	public providers: Array<any>

	constructor() {
		this.providers = [
			NamespaceService,
			UserService
		];
	}
}