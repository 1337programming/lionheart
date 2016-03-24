import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http} from 'angular2/http';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'new-content',
  template: require('./new-content.html'),
  directives: [RouterLink]
})

export class NewContent {
  newContentForm:ControlGroup;

  constructor(private router:Router, fb:FormBuilder, private http:Http, private userService: UserService) {
    this.newContentForm = fb.group({
      key: ['', Validators.required],
      value: [''],
      description: ['']
    });
  }

  createNamespace() {
    let props = this.newContentForm.value;
    let body = JSON.stringify({
      name: props.name
    });
    this.http.post('http://localhost:8080/content/', body, this.userService.headersObj).subscribe(
      data => {
        console.log(data.text());
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }
}
