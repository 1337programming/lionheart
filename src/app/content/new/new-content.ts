import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {Control, FormBuilder, Validators, ControlGroup} from 'angular2/src/common/forms';
import {Http} from 'angular2/http';
import {UserService} from '../../user/user.service';
import {NamespaceService} from "../../namespaces/namespace.service";
import {Namespace} from "../../namespaces/namespace.model";

@Component({
    selector: 'new-content',
    template: require('./new-content.html'),
    directives: [RouterLink]
})

export class NewContent {
    newContentForm:ControlGroup;
    currentNamespace:Namespace;
    constructor(private router:Router, fb:FormBuilder, private http:Http, private userService:UserService, private namespaceService: NamespaceService) {
        this.newContentForm = fb.group({
            key: ['', Validators.required],
            value: [''],
            description: ['']
        });
        this.currentNamespace = this.namespaceService.currentNamespace;
        if (!this.currentNamespace) {
            this.router.navigate(['/Home']);
        }
    }

    createNewContent() {
        let body:string = JSON.stringify(this.newContentForm.value);
        let namespaceId:String = this.currentNamespace.id;
        this.http.post(`http://localhost:8080/namespace/${namespaceId}/content/`, body, this.userService.headersObj).subscribe(
            data => {
                console.log(data.text());
            },
            err => {
                console.log('Error: ', err);
            }
        );
    }
}
