import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {UserPageService} from './userpage.service';
import {User} from './user.model';
let style = require('!!raw!sass!./userpage.scss');

@Component({
  selector: 'user-page',
  template: require('./userpage.html'),
  styles: [style],
  providers: [UserPageService],
  directives: [RouterLink]
})

export class UserPage {

  userPageService:UserPageService;
  user:User;

  constructor(user:User, userPageService:UserPageService) {
    this.userPageService = userPageService;
    this.user = this.userPageService.user;
  }

}
