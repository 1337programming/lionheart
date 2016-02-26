import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http, Headers} from 'angular2/http';

@Component({
  selector: 'new-namespace',
  template: require('./new-namespace.html'),
  directives: [RouterLink]
})

export class NewNamespace {
  newNamespaceForm:ControlGroup;
  http:Http;

  constructor(private router:Router, fb:FormBuilder, http:Http) {
    this.http = http;
    this.newNamespaceForm = fb.group({
      name: ["", Validators.required]
    });
  }

  createNamespace() {
    console.log('Form submitted!');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwt'));
    let props = this.newNamespaceForm.value;
    let body = JSON.stringify({
      name: props.name
    });
    this.http.post('http://localhost:8080/namespace/new', body, {headers}).subscribe(
      data => {
        console.log(data.text());
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('jwt'));
        this.http.post('http://localhost:8080/api/users/add-namespace', data.text(), {headers}).subscribe(
          data => {
            console.log(data.text());
            if (data.text() === 'OK') {
              this.router.navigate(['/Namespaces']);
            } else {
              console.log('Failed'); //TODO: add error message
            }
          },
          err => {
            console.log('Error:', err); //TODO: add error message
          }
        );
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }
}
