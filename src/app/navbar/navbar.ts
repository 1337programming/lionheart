import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {NgClass, NgIf} from 'angular2/common';
import {Location} from "angular2/router";
import {UserService} from '../user/user.service';
let style = require('!!raw!sass!./navbar.scss');

@Component({
	selector: 'navbar',
	template: require('./navbar.html'),
	styles: [style],
	directives: [RouterLink, NgClass, NgIf]
})

export class Navbar implements OnInit {
	loggedIn: boolean = false;
	constructor(private location: Location, private userService: UserService) {}

	ngOnInit() {
		this.userService.loggedInSubject.subscribe((loggedInStatus) => {
			this.loggedIn = loggedInStatus;
		});		
	}

	isLocationEqual(loc:string):boolean {
		return this.location.path() === loc;
	}

}
