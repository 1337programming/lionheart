import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http, Headers} from 'angular2/http';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'new-namespace',
  template: require('./new-namespace.html'),
  directives: [RouterLink]
})

export class NewNamespace {
  newNamespaceForm:ControlGroup;
  http:Http;

  constructor(private router:Router, fb:FormBuilder, http:Http, private userService: UserService) {
    this.http = http;
    this.newNamespaceForm = fb.group({
      name: ["", Validators.required]
    });
  }

  createNamespace() {
    let props = this.newNamespaceForm.value;
    let body = JSON.stringify({
      name: props.name
    });
    this.http.post('http://localhost:8080/namespace/', body, this.userService.headersObj).subscribe(
      data => {
        console.log(data.text());
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }
}
