import {Component, ChangeDetectionStrategy, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {NgClass, NgIf} from 'angular2/common';
import {Location} from "angular2/router";
import {UserService} from '../user/user.service';

let style = require('!!raw!sass!./navbar.scss');

@Component({
	selector: 'navbar',
	template: require('./navbar.html'),
	styles: [style],
	directives: [RouterLink, NgClass, NgIf],
	providers: [UserService],
	changeDetection: ChangeDetectionStrategy.OnPushObserve
})

export class Navbar implements OnInit {
	isLoggedIn: boolean = false;
	constructor(private location: Location, public userService: UserService) {}

	isLocationEqual(loc:string):boolean {
		return this.location.path() === loc;
	}

	ngOnInit(): void {
		this.userService.loggedIn.subscribe((isLoggedIn: boolean) => {
			console.log('RECEIVED!!', isLoggedIn);
			this.isLoggedIn = isLoggedIn;
		});
	}
}
