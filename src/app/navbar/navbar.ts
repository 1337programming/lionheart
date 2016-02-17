import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {NgClass} from 'angular2/common';
import {Location} from "angular2/router";

let style = require('!!raw!sass!./navbar.scss');

@Component({
	selector: 'navbar',
	template: require('./navbar.html'),
	styles: [style],
	directives: [RouterLink, NgClass]
})

export class Navbar {
	location: Location;
	constructor(location: Location) {
		this.location = location;
	}

	isLocationEqual(loc:string):boolean {
		return this.location.path() === loc;
	}

}
