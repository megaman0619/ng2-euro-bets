/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {Auth} from './core/services/firebase/auth.service';

import {LoginCmp} from './login/index';
import {PronosCmp} from './pronos/index';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [],
  styles: [
    require('./app.scss')
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  {path: '/', name: 'Index', component: PronosCmp, useAsDefault: true},
  {path: '/pronos', name: 'Pronos', component: PronosCmp},
  {path: '/login', name: 'Login', component: LoginCmp}
])
export class App {

  private authenticated: boolean;

  constructor(private auth: Auth) {
  }

  ngOnInit() {
    console.log('app#ngOnInit');

    this.auth.onAuth();
    this.auth.authenticated$.subscribe(authenticated => {
      this.authenticated = authenticated;
    })
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */