import {Injectable} from 'angular2/core';

@Injectable()
export class UserService {
	jwtToken: string;
	constructor(private ngZone: NgZone) {
		this.updateLoggedInStatus();
	}

	updateLoggedInStatus(): void {
		this.jwtToken = localStorage.getItem('jwt');
	}

	get isLoggedIn(): boolean {
		return !!this.jwtToken;
	}
}