import {Injectable} from 'angular2/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {Headers} from 'angular2/http';

@Injectable()
export class UserService {
	jwtToken: string;
	headers: Headers;
	public loggedInSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
	constructor() {
		this.updateLoggedInStatus();
	}

	updateLoggedInStatus(): void {
		this.jwtToken = localStorage.getItem('jwt');
		this.loggedInSubject.next(this.isLoggedIn);
		this.createHeaders();
	}

	createHeaders(): void {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		if (this.jwtToken) {
			this.headers.append('Authorization', this.jwtToken);
		}
	}

	get isLoggedIn(): boolean {
		return !!this.jwtToken;
	}

	get headersObj(): any {
		return {
			headers: this.headers
		};
	}
}
