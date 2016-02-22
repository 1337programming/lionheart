import {Injectable, NgZone} from 'angular2/core';

@Injectable()
export class UserService {
	jwtToken: string;
	public isLoggedIn: boolean
	constructor(private ngZone: NgZone) {
		this.updateLoggedInStatus();
	}

	updateLoggedInStatus(): void {
		this.jwtToken = localStorage.getItem('jwt');
		this.ngZone.run(() => {

			this.isLoggedIn = !!this.jwtToken;
			console.log('ngZone running!', this.isLoggedIn);
		});
		
	}
}