import {Injectable} from 'angular2/core';
import {Subject, BehaviorSubject} from 'rxjs';
@Injectable()
export class UserService {
	jwtToken: string;
	public loggedInSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
	constructor() {
		this.updateLoggedInStatus();
	}

	updateLoggedInStatus(): void {
		this.jwtToken = localStorage.getItem('jwt');
		this.loggedInSubject.next(this.isLoggedIn);
	}

	get isLoggedIn(): boolean {
		return !!this.jwtToken;
	}
}
