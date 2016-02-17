import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';

@Directive({
  selector: 'router-outlet'
})
export class AuthRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      '/login': true,
      '/signup': true
    };
  }

  activate(instruction: ComponentInstruction) {
    let url = this.parentRouter.lastNavigationAttempt;
    let jwt = localStorage.getItem('jwt');
    if (!this.publicRoutes[url] && !jwt) {
      this.parentRouter.navigateByUrl('/login');
    }
    if (this.publicRoutes[url] && jwt) {
      this.parentRouter.navigateByUrl('/home')
    }
    return super.activate(instruction);
  }
}