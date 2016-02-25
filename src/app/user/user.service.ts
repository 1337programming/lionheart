import {Injectable} from 'angular2/core';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable()
export class UserService {
	jwtToken: string;
	public isLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

	constructor() {
		this.updateLoggedInStatus();
		this.isLoggedIn.subscribe((token) => {
			console.log('WOOHOO');
		});
	}

	public updateLoggedInStatus(): void {
		this.jwtToken = localStorage.getItem('jwt');
		console.log('Setting next subscription', !!this.jwtToken);
		this.isLoggedIn.next(!!this.jwtToken);

	}

	setNextIsLoggedIn(val) {
		console.log('Received val', val);
		this.isLoggedIn.next(val);
	}

	get loggedIn() {
		return this.isLoggedIn.asObservable().publish().refCount();
	}
}