import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http, Headers} from 'angular2/http';

@Component({
	selector: 'new-namespace',
	template: require('./new-namespace.html'),
	directives: [RouterLink]
})

export class NewNamespace {
	newNamespaceForm: ControlGroup;
	http: Http;

	constructor(fb: FormBuilder, http: Http) {
		this.http = http;
		this.newNamespaceForm = fb.group({
			name: ["", Validators.required]
		});
	}

	createNamespace() {
		console.log('Form submitted!');
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let props = this.newNamespaceForm.value;
		let body = JSON.stringify({
			name: props.name
		});
		this.http.post('http://localhost:8080/namespace/new', body, { headers }).subscribe(
			data => {
				console.log(data.text());
				let body = JSON.parse(data.text());
				console.log('response!', body);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}
}
