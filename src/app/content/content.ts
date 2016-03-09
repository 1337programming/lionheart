import {Component, OnInit} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {NamespaceService} from '../namespaces/namespace.service';

@Component({
	selector: 'content',
	template: require('./content.html'),
	directives: [RouterLink]
})

export class Content implements OnInit {
	constructor(private router: Router, private namespaceService: NamespaceService) {}

	ngOnInit(): void {
		this.namespaceService.updateNamespaces();
	}

}
